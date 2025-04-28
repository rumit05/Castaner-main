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

  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [numberError, setNumberError] = useState('');

  const prevValues = useRef({ name: '', lastName: '', number: '' });

  // Buyer Journey Intercept
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress) {
      if (!isNameSet() || !isLastNameSet() || !isNumberSet()) {
        return {
          behavior: 'block',
          reason: 'Missing required fields',
          perform: (result) => {
            if (result.behavior === 'block') {
              if (!isNameSet()) setNameError(translate("nameerror"));
              if (!isLastNameSet()) setLastNameError(translate("lastnameerror"));
              if (!isNumberSet()) setNumberError(translate("numbererror"));
            }
          },          
        };
      }
    }

    return {
      behavior: 'allow',
      perform: () => {
        clearValidationErrors();
      },
    };
  });

  // Attribute syncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name && name !== prevValues.current.name) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup_by_firstname :', value: name });
        prevValues.current.name = name;
      }
      if (lastName && lastName !== prevValues.current.lastName) {
        applyAttributeChange({ type: 'updateAttribute', key: 'Pickup_by_lastname :', value: lastName });
        prevValues.current.lastName = lastName;
      }
      if (number && number !== prevValues.current.number) {
        applyAttributeChange({ type: 'updateAttribute', key: 'pickup_by_contact :', value: number });
        prevValues.current.number = number;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [name, lastName, number]);

  // Validation helpers
  function isNameSet() {
    return name.trim() !== '';
  }
  function isLastNameSet() {
    return lastName.trim() !== '';
  }
  function isNumberSet() {
    return number.trim() !== '';
  }
  function clearValidationErrors() {
    setNameError('');
    setLastNameError('');
    setNumberError('');
  }

  // UI
  return (
    <BlockStack spacing="base">
      <BlockSpacer spacing="base" />
      <Text emphasis="bold" size="large">
        {settings.current.pickup_fields_heading}
      </Text>

      <TextField
        label={translate("name")}
        value={name}
        onChange={(value) => {
          setName(value);
          if (nameError) setNameError(''); // Clear error when typing
        }}
        error={nameError}
        required
      />
      <TextField
        label={translate("lastname")}
        value={lastName}
        onChange={(value) => {
          setLastName(value);
          if (lastNameError) setLastNameError('');
        }}
        error={lastNameError}
        required
      />
      <TextField
        label={translate("number")}
        value={number}
        onChange={(value) => {
          setNumber(value);
          if (numberError) setNumberError('');
        }}
        error={numberError}
        required
      />
    </BlockStack>
  );
}
