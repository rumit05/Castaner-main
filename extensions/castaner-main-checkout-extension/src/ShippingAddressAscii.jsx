import React, { useEffect, useState } from 'react';
import {
  reactExtension,
  useBuyerJourneyIntercept,
  useShippingAddress,
  useTranslate
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />
);

function Extension() {
  const address = useShippingAddress();
  const translate = useTranslate();
  const [addressString, setAddressString] = useState('');

  useEffect(() => {
    const addressStr = JSON.stringify(address);
    let data = JSON.parse(addressStr);
    setAddressString(data);
  }, [address]);



  const containsEmoji = () => {
    const emojiRegex = /[^\x00-\x7F]/;

    const invalidField = Object.keys(addressString).find(field => {
      const fieldValue = addressString[field];
      if (fieldValue && emojiRegex.test(fieldValue)) {
        return true;
      }
      return false;
    });

    if (invalidField) {
      // Dynamically generate the target based on the invalid field
      const target = `$.cart.deliveryGroups[0].deliveryAddress.${invalidField}`;
      
      return {
        target,
        field: invalidField,
      };
    }

    return null;
  };

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress) {
      const errorInfo = containsEmoji();

      if (errorInfo) {
        return {
          behavior: 'block', 
          reason: 'Invalid address character',
          errors: [
            {
              message: `${translate (`${errorInfo.field}`) }`,
              target: errorInfo.target,
            },
          ],
        };
      }
    }

    return {
      behavior: 'allow',
      perform: () => {
        // Ensure any errors from the previous validation are hidden
        clearValidationErrors();
      },
    };
  });

  function clearValidationErrors() {
    // Implement any logic to clear validation errors if needed
  }

  return null;
}
