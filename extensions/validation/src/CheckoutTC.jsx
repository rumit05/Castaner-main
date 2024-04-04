import {
    reactExtension,
    Link,
    Text,
    useTranslate,
  } from '@shopify/ui-extensions-react/checkout';
  
  export default reactExtension(
    'purchase.checkout.block.render',
    () => <Extension />,
  );
  
  function Extension() {
    const translate = useTranslate()
    return (
      <Text appearance='accent'>
        {translate("TC")} <Link to='https://castaner-ohd.myshopify.com/pages/condiciones-de-compra'> {translate("link")} </Link> {translate("and")} <Link to='https://castaner-ohd.myshopify.com/pages/politica-de-privacidad'> {translate("link1")} </Link>.
      </Text>
    );
  }
  