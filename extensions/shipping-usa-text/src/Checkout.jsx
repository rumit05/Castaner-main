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

export default reactExtension("purchase.checkout.delivery-address.render-after", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { countryCode } = useShippingAddress();
  const { amount } = useSubtotalAmount();
  const { localization, settings } = useApi();

  const languageCode = localization.language.current.isoCode.split("-")[0];
  console.log(languageCode,"======>")
  const tAmount = Number(settings.current.cart_total ?? 0);
  const showDisclaimer = countryCode?.toLowerCase() === "es" && amount > tAmount;

  if (!showDisclaimer || !settings?.current) return null;

  const enFirst = settings.current.description_text_en_first?.trim() ?? "";
  const enSecond = settings.current.description_text_en_second?.trim() ?? "";
  const esFirst = settings.current.description_text_es_first?.trim() ?? "";
  const esSecond = settings.current.description_text_es_second?.trim() ?? "";

  // Fallback to English by default, only use Spanish if explicitly requested
  const content =
    languageCode === "es" ? (
      <Banner status="warning" padding="tight">
        <Text>{esFirst}</Text>
        <View>
          <Text emphasis="bold">{esSecond}</Text>
        </View>
      </Banner>
    ) : (
      <Banner status="warning" padding="tight">
        <Text>{enFirst}</Text>
        <View>
          <Text emphasis="bold">{enSecond}</Text>
        </View>
      </Banner>
    );

  return content;
}
