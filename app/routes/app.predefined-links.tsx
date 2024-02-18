import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
  useNavigate,
} from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";

import { authenticate } from "../shopify.server";
import {
  Card,
  Bleed,
  Button,
  ChoiceList,
  Divider,
  EmptyState,
  InlineStack,
  InlineError,
  Layout,
  Page,
  Text,
  TextField,
  Thumbnail,
  BlockStack,
  PageActions,
  Box,
} from "@shopify/polaris";

export default function PreDefinedLinks() {
  //   shopify.loading(false);

  async function selectCollections() {
    const collections = await window.shopify.resourcePicker({
      type: "collection",
      action: "select", // customized action verb, either 'select' or 'add',
    });

    if (collections) {
      console.log(collections);
    }
  }
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Product Beautifier">
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                This is a page that demonstrates the use of pre-defined links.
              </Text>
            </BlockStack>
          </Card>
          <Card title="Define Collections">
            <Button onClick={selectCollections}>Select Collection</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
