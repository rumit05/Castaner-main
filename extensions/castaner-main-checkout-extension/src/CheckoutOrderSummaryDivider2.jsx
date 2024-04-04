import {
    reactExtension,
    Divider,
    BlockSpacer,
  } from '@shopify/ui-extensions-react/checkout';
  
  export default reactExtension(
    'purchase.checkout.reductions.render-after',
    () => <Extension />,
  );
  
  function Extension() {
    return (
      <>
        <BlockSpacer spacing="base" />
        <Divider />
      </>
    );
  }
  