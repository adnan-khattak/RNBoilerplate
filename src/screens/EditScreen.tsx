import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Text, Input, Loading } from '@components';
import { updateItem, Item } from '@services/api';
import { useItem } from '@services/hooks';
import { useTheme } from '@theme';
import { STRINGS } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Edit'>;

export default function EditScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const routeItem = route.params?.item;
  const itemId = routeItem?.id;
  
  // Fetch item from cache/API for offline support and real-time updates
  const { data: fetchedItem, isLoading } = useItem(itemId);
  const item = fetchedItem || routeItem;
  const queryClient = useQueryClient();

  /* ------------------ FORM STATE ------------------ */
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  // Update form when item is fetched
  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setDescription(item.description || '');
      setPrice(item.price?.toString() || '');
    }
  }, [item]);

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
  const validate = useCallback((): boolean => {
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
  }, [description, name]);

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    updateMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : undefined,
    });
  }, [description, name, price, updateMutation, validate]);

  const hasChanges = useCallback(() => {
    return (
      name !== item?.name ||
      description !== item?.description ||
      price !== (item?.price?.toString() || '')
    );
  }, [description, item, name, price]);

  return (
    <KeyboardAvoidingView
      style={[layout.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {isLoading && (
        <View style={layout.containerCentered}>
          <Loading />
        </View>
      )}
      {!isLoading && (
        <ScrollView
          style={[layout.container, { backgroundColor: colors.background }]}
          contentContainerStyle={[paddings.pBase, paddings.pbXl]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Dark Header */}
          <View style={[
            { backgroundColor: colors.surface, padding: 16, borderRadius: 12, marginBottom: 24 }
          ]}>
            <Text variant="h3" style={{ color: colors.text }}>{STRINGS.EDIT.TITLE}</Text>
            <Text variant="body" color="muted" style={margins.mtXs}>
              {STRINGS.EDIT.SUBTITLE}
            </Text>
          </View>

          {/* Form */}
          <View style={margins.mbXl}>
            <Input
              label={STRINGS.FORM.NAME}
              value={name}
              onChangeText={setName}
              error={errors.name}
              required
            />

            <Input
              label={STRINGS.FORM.DESCRIPTION}
              value={description}
              onChangeText={setDescription}
              error={errors.description}
              multiline
              required
            />

            <Input
              label={STRINGS.FORM.PRICE_OPTIONAL}
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              helperText={STRINGS.CREATE.PRICE_HELPER}
            />
          </View>

          {/* Actions */}
          <View style={margins.mtLg}>
            <Button
              title={STRINGS.EDIT.SAVE_CHANGES}
              fullWidth
              loading={updateMutation.isPending}
              disabled={!hasChanges()}
              onPress={handleSubmit}
              style={margins.mbMd}
            />
            <Button
              title={STRINGS.COMMON.CANCEL}
              variant="ghost"
              fullWidth
              onPress={() => navigation.goBack()}
              disabled={updateMutation.isPending}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
