import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Text, Input } from '../components';
import { updateItem, Item } from '../services/api';
import { spacing } from '../theme/theme';
import { layout, margins, paddings } from '../theme/styles';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditScreen({ navigation, route }: Props) {
  const { item } = route.params;
  const queryClient = useQueryClient();

  /* ------------------ FORM STATE ------------------ */
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price?.toString() || '');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  /* ------------------ UPDATE MUTATION ------------------ */
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Item>) => updateItem(item.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      Alert.alert('Success', 'Item updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    },
    onError: () => {
      Alert.alert('Error', 'Failed to update item');
    },
  });

  /* ------------------ VALIDATION ------------------ */
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

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = () => {
    if (!validate()) return;

    updateMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : undefined,
    });
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
            value={name}
            onChangeText={setName}
            error={errors.name}
            required
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            required
          />

          <Input
            label="Price (Optional)"
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
            fullWidth
            loading={updateMutation.isPending}
            disabled={!hasChanges()}
            onPress={handleSubmit}
            style={margins.mbMd}
          />
          <Button
            title="Cancel"
            variant="ghost"
            fullWidth
            onPress={() => navigation.goBack()}
            disabled={updateMutation.isPending}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
