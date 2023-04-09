import { IZoneShippment } from "../../types";
import ShippementManager from "../ShippementManager";
import ShippingObjectFactory from "../ShippingObjectFactory";

const ZONESHIPPMENT_LIST_JSON: IZoneShippment[] = [
  {
    zone_id: 1,
    zone_name: "France",
    zone_order: 0,
    zone_locations: [
      {
        code: "FR",
        type: "country",
      },
    ],
    zone_formatted_location: "France",
    zone_shipping_methods: [
      {
        method_title: "Flat rate",
        method_id: "flat_rate",
        method_rate_id: "flat_rate:2",
        method_user_title: "Collissimo",
        method_is_enbled: true,
        method_cost: "8.99",
        methode_description:
          "<p>Lets you charge a fixed rate for shipping.</p>\n",
        method_instance_id: 2,
        min_amount: null,
      },
      {
        method_title: "Flat rate",
        method_id: "flat_rate",
        method_rate_id: "flat_rate:3",
        method_user_title: "Mondial relay",
        method_is_enbled: true,
        method_cost: "10",
        methode_description:
          "<p>Lets you charge a fixed rate for shipping.</p>\n",
        method_instance_id: 3,
        min_amount: null,
      },
      {
        method_title: "Free shipping",
        method_id: "free_shipping",
        method_rate_id: "free_shipping:5",
        method_user_title: "Free shipping",
        method_is_enbled: true,
        method_cost: null,
        methode_description:
          "<p>Free shipping is a special method which can be triggered with coupons and minimum spends.</p>\n",
        method_instance_id: 5,
        min_amount: "1000",
      },
    ],
  },
  {
    zone_id: 2,
    zone_name: "USA et Canada",
    zone_order: 0,
    zone_locations: [
      {
        code: "CA",
        type: "country",
      },
      {
        code: "US",
        type: "country",
      },
    ],
    zone_formatted_location: "Canada, United States (US)",
    zone_shipping_methods: [
      {
        method_title: "Flat rate",
        method_id: "flat_rate",
        method_rate_id: "flat_rate:4",
        method_user_title: "Livraison International",
        method_is_enbled: true,
        method_cost: "30",
        methode_description:
          "<p>Lets you charge a fixed rate for shipping.</p>\n",
        method_instance_id: 4,
        min_amount: null,
      },
    ],
  },
  {
    zone_id: 0,
    zone_name: "Locations not covered by your other zones",
    zone_order: 0,
    zone_locations: [],
    zone_formatted_location: "Everywhere",
    zone_shipping_methods: [],
  },
];

const ZONESHIPPMENT_LIST_JSON_RESULT = {
  zoneShippementList: [
    {
      formatedLocation: "France",
      id: 1,
      name: "France",
      shippingMethodList: [
        {
          freeShipping: false,
          methodCost: 8.99,
          methodDescription: null,
          methodRateId: "flat_rate:2",
          methodTitle: "Flat rate",
          methodUserTitle: "Collissimo",
          minAmount: 0,
        },
        {
          freeShipping: false,
          methodCost: 10,
          methodDescription: null,
          methodRateId: "flat_rate:3",
          methodTitle: "Flat rate",
          methodUserTitle: "Mondial relay",
          minAmount: 0,
        },
        {
          freeShipping: true,
          methodCost: 0,
          methodDescription: null,
          methodRateId: "free_shipping:5",
          methodTitle: "Free shipping",
          methodUserTitle: "Free shipping",
          minAmount: 1000,
        },
      ],
      zoneLocationsList: [{ code: "FR", type: "country" }],
    },
    {
      formatedLocation: "Canada, United States (US)",
      id: 2,
      name: "USA et Canada",
      shippingMethodList: [
        {
          freeShipping: false,
          methodCost: 30,
          methodDescription: null,
          methodRateId: "flat_rate:4",
          methodTitle: "Flat rate",
          methodUserTitle: "Livraison International",
          minAmount: 0,
        },
      ],
      zoneLocationsList: [
        { code: "CA", type: "country" },
        { code: "US", type: "country" },
      ],
    },
    {
      formatedLocation: "Everywhere",
      id: 0,
      name: "Locations not covered by your other zones",
      shippingMethodList: [],
      zoneLocationsList: [],
    },
  ],
};


describe("Shippment Object Fcatory", () => {
  test("works with a multiple zone shippement", () => {
    const shippingObjectFactory: ShippingObjectFactory =
      new ShippingObjectFactory();
    const shippementManager: ShippementManager =
      shippingObjectFactory.getShippementManager(ZONESHIPPMENT_LIST_JSON);
    expect(shippementManager).toMatchObject(ZONESHIPPMENT_LIST_JSON_RESULT);
  });
});
