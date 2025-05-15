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

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));
// purchase.checkout.delivery-address.render-after
function Extension() {
  const translate = useTranslate();
  const { countryCode } = useShippingAddress();
  const { amount, currencyCode } = useSubtotalAmount();
  const { localization, settings } = useApi();

  const languageCode = localization.language.current.isoCode.split("-")[0];
  const tAmount = Number(settings.current.cart_total ?? 0);

  let amountInUSD = tAmount;
  if (currencyCode === "EUR") {
    const exchangeRate = Number(settings.current.exchange_rate_eur_to_usd ?? 0.9); // fallback = 1 if not set
    amountInUSD = tAmount * exchangeRate;
  }
  const showDisclaimer = countryCode?.toLowerCase() === "us" && amount > amountInUSD;

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
