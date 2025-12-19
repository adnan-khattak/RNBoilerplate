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

import { Button, Text, Input } from '@components';
import { createItem, Item } from '@services/api';
import { STRINGS } from '@config';
import { layout, margins, paddings } from '@theme/styles';
import { RootStackParamList } from '@navigation/types';

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
      Alert.alert(STRINGS.COMMON.SUBMIT, STRINGS.CREATE.SUCCESS, [
        { text: STRINGS.COMMON.OK, onPress: () => navigation.goBack() },
      ]);
    },
    onError: () => {
      Alert.alert(STRINGS.COMMON.ERROR, STRINGS.CREATE.ERROR);
    },
  });

  /* ------------------ VALIDATION ------------------ */
  const validate = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = STRINGS.VALIDATION.NAME_REQUIRED;
    } else if (name.trim().length < 2) {
      newErrors.name = STRINGS.VALIDATION.NAME_MIN_LENGTH;
    }

    if (!description.trim()) {
      newErrors.description = STRINGS.VALIDATION.DESCRIPTION_REQUIRED;
    } else if (description.trim().length < 10) {
      newErrors.description = STRINGS.VALIDATION.DESCRIPTION_MIN_LENGTH;
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
        contentContainerStyle={[paddings.pBase, paddings.pbXl]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={margins.mbXl}>
          <Text variant="h3">{STRINGS.CREATE.HEADER}</Text>
          <Text variant="body" color="muted" style={margins.mtXs}>
            {STRINGS.CREATE.SUBTITLE}
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
            autoFocus
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
            title={STRINGS.CREATE.TITLE}
            fullWidth
            loading={createMutation.isPending}
            onPress={handleSubmit}
            style={margins.mbMd}
          />
          <Button
            title={STRINGS.COMMON.CANCEL}
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
