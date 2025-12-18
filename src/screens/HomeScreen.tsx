import { View, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Import reusable components
import { Button, Text, Input } from '../components';

// Import theme and styles
import { layout, margins, cardStyles, common } from '../theme';
import { colors, spacing } from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={layout.container} contentContainerStyle={common.scrollContent}>
      {/* Header Section */}
      <View style={margins.mbXl}>
        <Text variant="h2">Welcome Home</Text>
        <Text variant="body" color="muted" style={margins.mtSm}>
          This is a demo of the StyleSheet boilerplate
        </Text>
      </View>

      {/* Card Example */}
      <View style={[cardStyles.base, margins.mbLg]}>
        <Text variant="h5" style={margins.mbSm}>Card Example</Text>
        <Text variant="bodySmall" color="muted">
          Using centralized card styles with shadow
        </Text>
      </View>

      {/* Input Examples */}
      <View style={margins.mbLg}>
        <Text variant="h5" style={margins.mbMd}>Input Components</Text>
        <Input 
          label="Email" 
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <Input 
          label="Password" 
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      {/* Button Examples */}
      <View style={margins.mbLg}>
        <Text variant="h5" style={margins.mbMd}>Button Variants</Text>
        
        <Button
          title="Go to Details"
          variant="primary"
          fullWidth
          onPress={() => navigation.navigate('Details', { id: 1 })}
          style={margins.mbSm}
        />
        
        <Button
          title="Secondary Button"
          variant="secondary"
          fullWidth
          onPress={() => {}}
          style={margins.mbSm}
        />
        
        <Button
          title="Outline Button"
          variant="outline"
          fullWidth
          onPress={() => {}}
          style={margins.mbSm}
        />
        
        <Button
          title="Ghost Button"
          variant="ghost"
          fullWidth
          onPress={() => {}}
        />
      </View>

      {/* Typography Examples */}
      <View style={margins.mbLg}>
        <Text variant="h5" style={margins.mbMd}>Typography</Text>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="body">Body text - regular paragraph text</Text>
        <Text variant="bodySmall" color="muted">Small muted text</Text>
        <Text variant="caption">Caption text</Text>
      </View>

      {/* Color Examples */}
      <View style={margins.mbLg}>
        <Text variant="h5" style={margins.mbMd}>Text Colors</Text>
        <Text color="primary">Primary Color</Text>
        <Text color="secondary">Secondary Color</Text>
        <Text color="success">Success Color</Text>
        <Text color="error">Error Color</Text>
        <Text color="warning">Warning Color</Text>
      </View>

      {/* Button Sizes */}
      <View style={margins.mb2xl}>
        <Text variant="h5" style={margins.mbMd}>Button Sizes</Text>
        <View style={[layout.rowCenter, { gap: spacing.sm }]}>
          <Button title="Small" size="small" onPress={() => {}} />
          <Button title="Medium" size="medium" onPress={() => {}} />
          <Button title="Large" size="large" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}
