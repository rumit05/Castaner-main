import {
  reactExtension,
  useDeliveryGroups,
  useDeliveryGroup,
  PhoneField,
  useApplyAttributeChange,
  TextField,
  BlockStack,
  Text,
  BlockLayout,
  useApi,
  useTranslate
  
} from '@shopify/ui-extensions-react/checkout';
import { useState, useEffect, useRef } from 'react';

export default reactExtension('purchase.checkout.pickup-point-list.render-before', () => <Extension />);

function Extension() {
  const applyAttributeChange = useApplyAttributeChange();
    const translate = useTranslate()
  

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const prevValues = useRef({ name: '', lastName: '', number: '' });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name && name !== prevValues.current.name) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup Name', value: name });
        prevValues.current.name = name;
      }
      if (lastName && lastName !== prevValues.current.lastName) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup Last Name', value: lastName });
        prevValues.current.lastName = lastName;
      }
      if (number && number !== prevValues.current.number) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup Number', value: number });
        prevValues.current.number = number;
      }

      console.log("Updating attributes...");
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, lastName, number]);

  return (
    <BlockStack spacing="base">
      <Text emphasis="bold" size="large">{translate("pickup")}</Text>
      <TextField label={translate("name")} value={name} onChange={(value) => setName(value)} required />
      <TextField label={translate("lastname")} value={lastName} onChange={(value) => setLastName(value)} required />
      <TextField label={translate("number")} value={number} onChange={(value) => setNumber(value)} required />
    </BlockStack>
  );
  
}
