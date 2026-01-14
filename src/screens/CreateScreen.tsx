import React, { useCallback, useState } from 'react';
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
import { createItem } from '@services/api';
import { useTheme } from '@theme';
import { layout, margins, paddings } from '@theme/styles';
import { RootStackParamList } from '@navigation/types';
import { useTranslationHook } from '@services/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;

export default function CreateScreen({ navigation }: Props) {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const { t } = useTranslationHook();

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
      Alert.alert(t('common.submit'), t('create.success'), [
        { text: t('common.ok'), onPress: () => navigation.goBack() },
      ]);
    },
    onError: () => {
      Alert.alert(t('common.error'), t('create.error'));
    },
  });

  /* ------------------ VALIDATION ------------------ */
  const validate = useCallback((): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = t('validation.nameRequired');
    } else if (name.trim().length < 2) {
      newErrors.name = t('validation.nameMinLength');
    }

    if (!description.trim()) {
      newErrors.description = t('validation.descriptionRequired');
    } else if (description.trim().length < 10) {
      newErrors.description = t('validation.descriptionMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [description, name, t]);

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = useCallback(() => {
    if (!validate()) return;

    createMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      price: price ? parseFloat(price) : undefined,
    });
  }, [createMutation, description, name, price, validate]);

  return (
    <KeyboardAvoidingView
      style={[layout.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[layout.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[paddings.pBase, paddings.pbXl]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Dark Header */}
        <View style={[
          layout.columnCenter,
          margins.mbXl,
          { backgroundColor: colors.surface, padding: 16, borderRadius: 12 }
        ]}>
          <Text variant="h3" style={{ color: colors.text }}>{t('create.header')}</Text>
          <Text variant="body" color="muted" style={margins.mtXs}>
            {t('create.subtitle')}
          </Text>
        </View>

        {/* Form */}
        <View style={margins.mbXl}>
          <Input
            label={t('form.name')}
            value={name}
            onChangeText={setName}
            error={errors.name}
            required
            autoFocus
          />

          <Input
            label={t('form.description')}
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            required
          />

          <Input
            label={t('form.priceOptional')}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            helperText={t('create.priceHelper')}
          />
        </View>

        {/* Actions */}
        <View style={margins.mtLg}>
          <Button
            title={t('create.title')}
            fullWidth
            loading={createMutation.isPending}
            onPress={handleSubmit}
            style={margins.mbMd}
          />
          <Button
            title={t('common.cancel')}
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
