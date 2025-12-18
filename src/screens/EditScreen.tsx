import React, { useState } from 'react';
import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, Input } from '../components';
import { updateItem } from '../services/api';
import { spacing } from '../theme/theme';
import { layout, margins, paddings } from '../theme/styles';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditScreen({ navigation, route }: Props) {
  const { item } = route.params;
  
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price?.toString() || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await updateItem(item.id, {
        name: name.trim(),
        description: description.trim(),
        price: price ? parseFloat(price) : undefined,
      });
      Alert.alert('Success', 'Item updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    return (
      name !== item.name ||
      description !== item.description ||
      price !== (item.price?.toString() || '')
    );
  };

  return (
    <KeyboardAvoidingView
      style={layout.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={layout.container}
        contentContainerStyle={[paddings.pBase, paddings.pb2xl]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={margins.mbXl}>
          <Text variant="h3">Edit Item</Text>
          <Text variant="body" color="muted" style={margins.mtXs}>
            Update the item details below
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
          <Input
            label="Name"
            placeholder="Enter item name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            required
          />

          <Input
            label="Description"
            placeholder="Enter item description"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            required
          />

          <Input
            label="Price (Optional)"
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            helperText="Leave empty if not applicable"
          />
        </View>

        {/* Actions */}
        <View style={margins.mtLg}>
          <Button
            title="Save Changes"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={!hasChanges()}
            onPress={handleSubmit}
            style={margins.mbMd}
          />
          <Button
            title="Cancel"
            variant="ghost"
            fullWidth
            onPress={() => navigation.goBack()}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
