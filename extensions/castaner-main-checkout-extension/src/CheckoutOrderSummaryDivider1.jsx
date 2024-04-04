import {
  reactExtension,
  Divider,
  BlockSpacer,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.reductions.render-before',
  () => <Extension />,
);

function Extension() {
  return (
    <>
      <Divider />
      <BlockSpacer spacing="tight" />
    </>
  );
}
