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
import { createItem, Item } from '../services/api';
import { layout, margins, paddings } from '../theme/styles';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props) {
  const queryClient = useQueryClient();

  /* ------------------ FORM STATE ------------------ */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  /* ------------------ CREATE MUTATION ------------------ */
  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      Alert.alert('Success', 'Item created successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    },
    onError: () => {
      Alert.alert('Error', 'Failed to create item');
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

    createMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : undefined,
    });
  };

  return (
    <KeyboardAvoidingView
      style={layout.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={layout.container}
        contentContainerStyle={[paddings.pBase, { paddingBottom: 32 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={margins.mbXl}>
          <Text variant="h3">Create New Item</Text>
          <Text variant="body" color="muted" style={margins.mtXs}>
            Fill in the details below to add a new item
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
            autoFocus
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
            title="Create Item"
            fullWidth
            loading={createMutation.isPending}
            onPress={handleSubmit}
            style={margins.mbMd}
          />
          <Button
            title="Cancel"
            variant="ghost"
            fullWidth
            onPress={() => navigation.goBack()}
            disabled={createMutation.isPending}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
