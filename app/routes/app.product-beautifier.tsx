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
import { ImageIcon } from "@shopify/polaris-icons";

import db from "../db.server";

// export async function loader({ request, params }) {}

// export async function action({ request, params }) {}

export default function ProductBeautifier() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ productId: "" });

  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select", // customized action verb, either 'select' or 'add',
    });

    if (products) {
      const { images, id, variants, title, handle } = products[0];

      setFormState({
        ...formState,
        productId: id,
        productVariantId: variants[0].id,
        productTitle: title,
        productHandle: handle,
        productAlt: images[0]?.altText,
        productImage: images[0]?.originalSrc,
      });
    }
  }

  const submit = useSubmit();

  return (
    <Page>
      <ui-title-bar title={"Product Beautifier"}>
        <button variant="breadcrumb" onClick={() => navigate("/app")}>
          QR codes
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card title="Product Beautifier">
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                To create your own form and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Product Beautifier">
            <BlockStack gap="300">
              <Button onClick={selectProduct}>Select product</Button>
            </BlockStack>
            <BlockStack gap="300">
              <Thumbnail
                source={formState.productImage || ImageIcon}
                alt={formState.productTitle}
                size="large"
              />
              <Text>{formState.productTitle}</Text>
              <Text>{formState.productHandle}</Text>

              {/* get information from user how to beautify the product description */}
              <Divider />
              <TextField
                label="Product title"
                value={formState.productTitle}
                onChange={(value) =>
                  setFormState({ ...formState, productTitle: value })
                }
              />
            </BlockStack>
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
