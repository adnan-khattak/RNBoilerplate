/**
 * QR Scanner Screen
 * Displays camera view with QR/Barcode scanning capability
 */

import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Camera, useCodeScanner, Code, useCameraDevice } from 'react-native-vision-camera';

import { Button, Text } from '@components';
import { useTheme } from '@theme';
import { layout, margins, paddings } from '@theme/styles';
import { AppStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AppStackParamList, 'QRScanner'>;

export default function QRScannerScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [scannedCode, setScannedCode] = useState<Code | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  
  // Get back camera device
  const device = useCameraDevice('back');

  // Setup code scanner for QR codes and barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && isScanning) {
        const code = codes[0];
        setScannedCode(code);
        setIsScanning(false);
        
        console.log(`Scanned ${codes.length} codes!`);
        console.log(`Code Type: ${code.type}`);
        console.log(`Code Value: ${code.value}`);
        
        // Show alert with scanned code details
        Alert.alert(
          'Code Scanned',
          `Type: ${code.type}\nValue: ${code.value}`,
          [
            {
              text: 'Scan Again',
              onPress: () => {
                setScannedCode(null);
                setIsScanning(true);
              },
              style: 'default',
            },
            {
              text: 'Go Back',
              onPress: () => navigation.goBack(),
              style: 'default',
            },
          ]
        );
      }
    },
  });

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const status = await Camera.requestCameraPermission();
        setHasCameraPermission(status === 'granted');
        
        if (status !== 'granted') {
          Alert.alert(
            'Camera Permission Required',
            'Please grant camera permission to scan QR codes',
            [
              {
                text: 'Go Back',
                onPress: () => navigation.goBack(),
              },
            ]
          );
        }
      } catch (error) {
        console.error('Camera permission error:', error);
        Alert.alert(
          'Error',
          'Failed to access camera',
          [
            {
              text: 'Go Back',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    };

    checkCameraPermission();
  }, [navigation]);

  // Show loading state if device is not ready
  if (device == null) {
    return (
      <View style={[layout.container, layout.center, { backgroundColor: colors.background }]}>
        <Text variant="body" color="muted">
          Initializing camera...
        </Text>
      </View>
    );
  }

  // Show permission denied state
  if (!hasCameraPermission) {
    return (
      <View style={[layout.container, layout.center, { backgroundColor: colors.background }]}>
        <Text variant="body" color="muted" style={margins.mbMd}>
          Camera permission required
        </Text>
        <Button
          title="Go Back"
          variant="primary"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  return (
    <View style={[layout.container, { backgroundColor: colors.background }]}>
      {/* Camera View */}
      <Camera
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={hasCameraPermission && isScanning}
        codeScanner={codeScanner}
        photo={false}
        video={false}
      />

      {/* Overlay with scanner frame */}
      <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
      
      <View style={[styles.scannerFrame, { borderColor: colors.primary }]} />

      {/* Header info */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            paddingTop: 16,
            paddingBottom: 16,
          },
        ]}
      >
        <Text variant="h3" color="white" align="center">
          Scan QR Code
        </Text>
        <Text variant="body" color="white" align="center" style={margins.mtXs}>
          Point camera at QR or barcode
        </Text>
      </View>

      {/* Bottom Actions */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            paddingTop: 16,
            paddingBottom: 16,
          },
        ]}
      >
        <View style={paddings.pMd}>
          <Button
            title="Close"
            variant="secondary"
            fullWidth
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      {/* Scanned Code Display */}
      {scannedCode && (
        <View
          style={[
            styles.codeDisplayBox,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.primary,
            },
          ]}
        >
          <Text variant="label" style={margins.mbSm}>
            Scanned Result:
          </Text>
          <Text variant="body" style={margins.mbXs}>
            <Text variant="body" color="muted">
              Type:{' '}
            </Text>
            {scannedCode.type}
          </Text>
          <Text
            variant="body"
            style={[margins.mbMd, { color: colors.primary, fontWeight: '600' }]}
          >
            {scannedCode.value}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scannerFrame: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderWidth: 3,
    borderRadius: 12,
    top: '50%',
    left: '50%',
    marginTop: -125,
    marginLeft: -125,
    zIndex: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  codeDisplayBox: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    borderTopWidth: 3,
    zIndex: 25,
  },
});
