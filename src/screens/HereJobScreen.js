// src/screens/HereJobScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import styles from '../styles/commonStyles';
import Header from '../components/Header';

// ── Job avatar meta ───────────────────────────────────────────────
const JOB_META = {
  Mason: { letter: 'M', color: '#4A90E2', bg: '#EAF2FB' },
  Electrician: { letter: 'E', color: '#E65100', bg: '#FFF3E0' },
  Painter: { letter: 'P', color: '#6A1B9A', bg: '#F3E5F5' },
  Plumber: { letter: 'Pl', color: '#00695C', bg: '#E0F2F1' },
  Carpenter: { letter: 'Ca', color: '#558B2F', bg: '#F1F8E9' },
};

// ── Pure helpers outside component (no hook violation) ───────────
const getJobsNearLocation = (lat, lng) => [
  {
    id: 1,
    title: 'Mason',
    pay: '600',
    unit: '/day',
    lat: lat + 0.008,
    lng: lng + 0.005,
  },
  {
    id: 2,
    title: 'Electrician',
    pay: '700',
    unit: '',
    lat: lat - 0.01,
    lng: lng - 0.008,
  },
  {
    id: 3,
    title: 'Painter',
    pay: '500',
    unit: '/day',
    lat: lat + 0.015,
    lng: lng + 0.012,
  },
  {
    id: 4,
    title: 'Plumber',
    pay: '650',
    unit: '/day',
    lat: lat - 0.006,
    lng: lng + 0.014,
  },
  {
    id: 5,
    title: 'Carpenter',
    pay: '580',
    unit: '/day',
    lat: lat + 0.02,
    lng: lng - 0.01,
  },
];

const getMapHTML = (lat, lng, jobs) => {
  const markers = jobs
    .map(
      j =>
        `{lat:${j.lat},lng:${j.lng},title:"${j.title}",pay:"\u20B9${j.pay}${j.unit}"}`,
    )
    .join(',');
  return `<!DOCTYPE html><html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      html,body{height:100%;overflow:hidden;touch-action:none}
      #map{height:100vh;width:100vw}
      .leaflet-control-attribution{font-size:8px!important;opacity:.3!important;background:transparent!important;box-shadow:none!important}
      /* Blue teardrop pin — matches #EA4335 */
      .pin-wrap{width:26px;height:36px;position:relative}
      .pin-body{width:26px;height:26px;background:#E53935;border-radius:50% 50% 50% 0;transform:rotate(-45deg);position:absolute;top:0;left:0;box-shadow:0 2px 8px rgba(229,57,53,.45);border:2.5px solid #fff}      .pin-inner{width:10px;height:10px;background:#fff;border-radius:50%;position:absolute;top:6px;left:6px}
      .pin-tail{width:4px;height:10px;background:#E53935;position:absolute;bottom:0;left:11px;border-radius:0 0 3px 3px}      /* User dot */
      .user-ring{width:22px;height:22px;border-radius:50%;background:rgba(74,144,226,.2);display:flex;align-items:center;justify-content:center;animation:pulse 2s infinite}
      .user-core{width:12px;height:12px;border-radius:50%;background:#4A90E2;border:2.5px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.25)}
      @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.7);opacity:.35}}
      /* Popup */
      .leaflet-popup-content-wrapper{border-radius:12px!important;padding:0!important;box-shadow:0 4px 20px rgba(0,0,0,.12)!important;overflow:hidden}
      .leaflet-popup-content{margin:0!important}
      .leaflet-popup-close-button{display:none!important}
      .pop{min-width:150px;padding:12px 16px;font-family:-apple-system,sans-serif}
      .pop-title{font-size:14px;font-weight:700;color:#2C3E50;margin-bottom:3px}
      .pop-pay{font-size:13px;font-weight:700;color:#5CB85C;margin-bottom:7px}
      .pop-tag{display:inline-block;font-size:10px;font-weight:600;color:#4A90E2;background:#EAF2FB;border-radius:20px;padding:3px 10px}
    </style>
  </head>
  <body><div id="map"></div>
  <script>
    var map=L.map('map',{zoomControl:true,attributionControl:true,tap:false,dragging:true,touchZoom:true,scrollWheelZoom:false,bounceAtZoomLimits:false}).setView([${lat},${lng}],14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM',maxZoom:19,detectRetina:true,updateWhenZooming:false,keepBuffer:3}).addTo(map);
    var jobIcon=L.divIcon({html:'<div class="pin-wrap"><div class="pin-body"><div class="pin-inner"></div></div><div class="pin-tail"></div></div>',className:'',iconSize:[26,36],iconAnchor:[13,36],popupAnchor:[0,-38]});
    var userIcon=L.divIcon({html:'<div class="user-ring"><div class="user-core"></div></div>',className:'',iconSize:[22,22],iconAnchor:[11,11],popupAnchor:[0,-13]});
    [${markers}].forEach(function(j){
      L.marker([j.lat,j.lng],{icon:jobIcon}).addTo(map)
        .bindPopup('<div class="pop"><div class="pop-title">'+j.title+'</div><div class="pop-pay">'+j.pay+'</div><span class="pop-tag">Full Day</span></div>',{maxWidth:220});
    });
    L.marker([${lat},${lng}],{icon:userIcon}).addTo(map)
      .bindPopup('<div style="font-family:sans-serif;font-size:13px;padding:8px 14px;font-weight:700;color:#4A90E2">Your Location</div>',{closeButton:false}).openPopup();
  </script></body></html>`;
};

// ─────────────────────────────────────────────────────────────────
const HereJobScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyJobs, setNearbyJobs] = useState([]);
  const [gpsLabel, setGpsLabel] = useState('');

  useEffect(() => {
    requestAndFetchLocation();
  }, []);

  const requestAndFetchLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Needed to show nearby jobs.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          const fb = { lat: 19.076, lng: 72.8777 };
          setLocation(fb);
          setNearbyJobs(getJobsNearLocation(fb.lat, fb.lng));
          setGpsLabel('Permission denied');
          setLoading(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude, accuracy } }) => {
          setLocation({ lat: latitude, lng: longitude });
          setNearbyJobs(getJobsNearLocation(latitude, longitude));
          setGpsLabel('Live GPS  ~' + Math.round(accuracy) + 'm');
          setLoading(false);
        },
        err => {
          const fb = { lat: 19.076, lng: 72.8777 };
          setLocation(fb);
          setNearbyJobs(getJobsNearLocation(fb.lat, fb.lng));
          setGpsLabel('GPS error (code ' + err.code + ')');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    } catch {
      const fb = { lat: 19.076, lng: 72.8777 };
      setLocation(fb);
      setNearbyJobs(getJobsNearLocation(fb.lat, fb.lng));
      setGpsLabel('GPS exception');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={{ paddingBottom: 32 }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page Title ───────────────────────────────────────── */}
        <Header title="Jobs Near You" navigation={navigation} />

        {/* ── GPS status — reuses jobLocation style ────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: '#4A90E2',
              marginRight: 6,
            }}
          />
          <Text style={styles.jobLocation}>Nearby Jobs on Map</Text>
        </View>

        {gpsLabel ? (
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: gpsLabel.startsWith('Live')
                ? '#EAF2FB'
                : '#FFE5E5',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: gpsLabel.startsWith('Live') ? '#4A90E2' : '#FF6B6B',
              }}
            >
              {gpsLabel.startsWith('Live') ? '● ' : '○ '}
              {gpsLabel}
            </Text>
          </View>
        ) : (
          <View style={{ marginBottom: 12 }} />
        )}

        {/* ── Map ─────────────────────────────────────────────── */}
        <View
          style={{
            height: 300,
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EAF2FB',
              }}
            >
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={[styles.subGreeting, { marginTop: 10 }]}>
                Getting your location...
              </Text>
            </View>
          ) : (
            <WebView
              source={{
                html: getMapHTML(location.lat, location.lng, nearbyJobs),
              }}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              geolocationEnabled={true}
              originWhitelist={['*']}
              scrollEnabled={false}
              bounces={false}
              nestedScrollEnabled={true}
              overScrollMode="never"
              androidLayerType="hardware"
            />
          )}
        </View>

        {/* ── Section Header ───────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
        >
          <Text style={styles.sectionTitle}>Recommended Jobs</Text>
          <View
            style={{
              backgroundColor: '#EAF2FB',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#4A90E2' }}>
              {nearbyJobs.length} Nearby
            </Text>
          </View>
        </View>

        {/* ── Job Cards ────────────────────────────────────────── */}
        {nearbyJobs.map(job => {
          const meta = JOB_META[job.title] || {
            letter: job.title[0],
            color: '#4A90E2',
            bg: '#EAF2FB',
          };
          return (
            <View 
              key={job.id} 
              style={styles.ongoingJobCard}
            >
              <View style={[styles.ongoingJobAccent, { backgroundColor: '#4A90E2'}]} />
              <View style={[styles.ongoingJobBody, { paddingVertical: 12 }]}>

              <View style={styles.jobCardHeader}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  {/* Letter avatar */}
                  <View
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      backgroundColor: meta.bg,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '800',
                        color: meta.color,
                      }}
                    >
                      {meta.letter}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobPayment}>
                      {'\u20B9'}
                      {job.pay}
                      {job.unit}
                    </Text>
                    <Text style={styles.jobLocation}>📍 Near your location</Text>
                  </View>
                </View>

                {/* New badge — reuses jobBadge from commonStyles */}
                <View style={styles.jobBadge}>
                  <Text style={styles.jobBadgeText}>New</Text>
                </View>
              </View>

              {/* Divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: '#F0F0F0',
                  marginVertical: 10,
                }}
              />

              {/* Footer row */}
              <View style={styles.jobCardFooter}>
                {/* Full Day pill */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F5F7FA',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: '#4A90E2',
                      marginRight: 5,
                    }}
                  />
                  <Text style={styles.jobTiming}>Full Day</Text>
                </View>

                {/* Accept button — reuses acceptButtonSmall */}
                <TouchableOpacity
                  style={[
                    styles.acceptButtonSmall,
                    {
                      backgroundColor: '#5CB85C',
                      paddingHorizontal: 22,
                      borderRadius: 10,
                      shadowColor: '#5CB85C',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.35,
                      shadowRadius: 5,
                      elevation: 4,
                    },
                  ]}
                  onPress={() => navigation.navigate('JobDetailFull')}
                >
                  <Text style={styles.acceptButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HereJobScreen;
