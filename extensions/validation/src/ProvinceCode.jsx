import {
  reactExtension,
  useBuyerJourneyIntercept,
  useShippingAddress,
  useTranslate,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const address = useShippingAddress();
  const translate = useTranslate();

  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    return canBlockProgress &&
      address?.provinceCode &&
      (
      address.provinceCode === "CE" ||
      address.provinceCode === "GC" ||
      address.provinceCode === "ML" ||
      address.provinceCode === "TF" ||
      address.provinceCode === "ID" ||
      address.provinceCode === "PR")
      ? {
          behavior: 'block',
          reason: 'Invalid shipping province/state',
          errors: [
            {
              message: `${translate("provinscode")}`,
              target:
                '$.cart.deliveryGroups[0].deliveryAddress.provinceCode',
            }
          ],
        }
      : {
          behavior: 'allow',
        };
  });

  return null;
}
