import {
  reactExtension,
  useApplyAttributeChange,
  useBuyerJourneyIntercept,
  TextField,
  BlockStack,
  Text,
  useTranslate,
  useApi,
  BlockSpacer,
  View
} from '@shopify/ui-extensions-react/checkout';
import { useState, useEffect, useRef } from 'react';

export default reactExtension('purchase.checkout.pickup-point-list.render-after', () => <Extension />);

function Extension() {
  const applyAttributeChange = useApplyAttributeChange();
  const translate = useTranslate();
  const { settings } = useApi();


  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const prevValues = useRef({ name: '', lastName: '', number: '' });

  // Validation logic: block progress if fields are empty
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && (!name || !lastName || !number)) {
      return {
        behavior: 'block',
        reason: 'Missing required fields',
        errors: [
          {
            message: 'Please complete all required pickup fields.',
          },
        ],
      };
    }

    return {
      behavior: 'allow',
    };
  });

  // Attribute syncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name && name !== prevValues.current.name) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup User First Name :', value: name });
        prevValues.current.name = name;
      }
      if (lastName && lastName !== prevValues.current.lastName) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pikckup User Last Name :', value: lastName });
        prevValues.current.lastName = lastName;
      }
      if (number && number !== prevValues.current.number) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pikckup User Phone Number :', value: number });
        prevValues.current.number = number;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, lastName, number]);

  // UI
  return (
    <BlockStack spacing="base">
      <BlockSpacer spacing="base" />
       <Text emphasis="bold" size="large">{settings.current.pickup_fields_heading}</Text>
      <TextField
        label={translate("name")}
        value={name}
        onChange={setName}
        required
      />
      <TextField
        label={translate("lastname")}
        value={lastName}
        onChange={setLastName}
        required
      />
      <TextField
        label={translate("number")}
        value={number}
        onChange={setNumber}
        required
      />
    </BlockStack>
  );
}