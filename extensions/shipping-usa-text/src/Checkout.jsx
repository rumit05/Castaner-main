import {
  reactExtension,
  Banner,
  BlockStack,
  Text,
  useApi,
  useShippingAddress,
  useSubtotalAmount,
  useTranslate,
  View
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.delivery-address.render-after", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { countryCode } = useShippingAddress();
  const { amount } = useSubtotalAmount();

  const showDisclaimer = countryCode?.toLowerCase() === "us" && amount > 800;

  if (!showDisclaimer) return null;

  return (
    <Banner status= "warning" padding="tight">                
      <Text>{translate("intro")}</Text>
      <View>
      <Text emphasis="bold">{translate("recommendation")}</Text>
      </View>
    </Banner>
  );
}
