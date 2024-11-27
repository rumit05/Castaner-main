import {
  reactExtension,
  useBillingAddress,
  useBuyerJourneyIntercept,
  useTranslate,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const address = useBillingAddress();
  const translate = useTranslate()

  useBuyerJourneyIntercept(
    ({ canBlockProgress }) => {
      const phoneInvalid = 
        !address?.phone ||
        Number.isNaN(Number(address.phone)) ||
        address.phone.trim() === '';
        console.log(canBlockProgress)

      return canBlockProgress && phoneInvalid
        ? {
            behavior: 'block',
            reason: 'Invalid phone number',
            errors: [
              {
                message:
                  `${translate("Error")}`,
              },
            ],
          }
        : {
            behavior: 'allow',
          };
    },
  );

  return null;
}
