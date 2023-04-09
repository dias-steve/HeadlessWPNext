import { IZoneShippment } from "../../types";
import { getContinentCodeOfCountry } from "../../utils/getContinentCodeFromCounrtryCode";
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
          method_description:
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
          method_description:
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
          method_description:
            "<p>Free shipping is a special method which can be triggered with coupons and minimum spends.</p>\n",
          method_instance_id: 5,
          min_amount: "1000",
        },
      ],
    },
    {
      zone_id: 2,
      zone_name: "Africa",
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
      zone_formatted_location: "Afric",
      zone_shipping_methods: [
        {
          method_title: "Flat rate",
          method_id: "flat_rate",
          method_rate_id: "flat_rate:4",
          method_user_title: "Livraison International",
          method_is_enbled: true,
          method_cost: "30",
          method_description:
            "<p>Lets you charge a fixed rate for shipping.</p>\n",
          method_instance_id: 4,
          min_amount: null,
        },
      ],
    },
    {
      zone_id: 90,
      zone_name: "Afrique",
      zone_order: 0,
      zone_locations: [
        {
          code: "AF",
          type: "continent",
        }
       
      ],
      zone_formatted_location: "Afrique",
      zone_shipping_methods: [
        {
          method_title: "Flat rate",
          method_id: "flat_rate",
          method_rate_id: "flat_rate:4",
          method_user_title: "Livraison International Afrique",
          method_is_enbled: true,
          method_cost: "30",
          method_description:
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
      zone_shipping_methods: [
        {
          "method_title": "Flat rate",
          "method_id": "flat_rate",
          "method_rate_id": "flat_rate:7",
          "method_user_title": "International",
          "method_is_enbled": true,
          "method_cost": "50",
          "method_description": "<p>Lets you charge a fixed rate for shipping.</p>\n",
          "method_instance_id": 7,
          "min_amount": null,
        }
      ],
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
            methodDescription: "<p>Lets you charge a fixed rate for shipping.</p>\n",
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
        formatedLocation: "Africa",
        id: 34,
        name: "Afrique",
        shippingMethodList: [
          {
            freeShipping: false,
            methodCost: 30,
            methodDescription: null,
            methodRateId: "flat_rate:345",
            methodTitle: "Flat rate",
            methodUserTitle: "Livraison International Afrique",
            minAmount: 0,
          },
        ],
        zoneLocationsList: [
          { code: "AF", type: "continent" }
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
  


  const LIST_SHIPPING_METHOD_FR = [
    {
      freeShipping: true,
      methodCost: 0,
      methodDescription:"<p>Free shipping is a special method which can be triggered with coupons and minimum spends.</p>\n",
      methodRateId: "free_shipping:5",
      methodTitle: "Free shipping",
      methodUserTitle: "Free shipping",
      minAmount: 1000,
    },
    {
      freeShipping: false,
      methodCost: 8.99,
      methodDescription: "<p>Lets you charge a fixed rate for shipping.</p>\n",
      methodRateId: "flat_rate:2",
      methodTitle: "Flat rate",
      methodUserTitle: "Collissimo",
      minAmount: 0,
    },
    {
      freeShipping: false,
      methodCost: 10,
      methodDescription: "<p>Lets you charge a fixed rate for shipping.</p>\n",
      methodRateId: "flat_rate:3",
      methodTitle: "Flat rate",
      methodUserTitle: "Mondial relay",
      minAmount: 0,
    }
  ]

  const LIST_SHIPPING_METHOD_SEN = [
    {
      methodTitle: 'Flat rate',
      methodRateId: 'flat_rate:4',
      methodUserTitle: 'Livraison International Afrique',
      methodCost: 30,
      methodDescription: "<p>Lets you charge a fixed rate for shipping.</p>\n",
      freeShipping: false,
      minAmount: 0,
      isEnbled: true
    }
  ]

  const LIST_SHIPPING_METHOD_EVERYWHERE = [
    {
      methodTitle: 'Flat rate',
      methodRateId: 'flat_rate:7',
      methodUserTitle: 'International',
      methodCost: 50,
      methodDescription: '<p>Lets you charge a fixed rate for shipping.</p>\n',
      freeShipping: false,
      minAmount: 0,
      isEnbled: true
    }
  ]

describe("Get MethodShipping list by Country", () => {
    test("work with a code country in ", () => {

        const shippingObjectFactory: ShippingObjectFactory =
        new ShippingObjectFactory();
        const shippementManager: ShippementManager =
        shippingObjectFactory.getShippementManager(ZONESHIPPMENT_LIST_JSON);

        const listShippingMethod =  shippementManager.getShippementMethodListByCountryCode("FR", 1000)
        expect(listShippingMethod).toMatchObject(LIST_SHIPPING_METHOD_FR)
    }),

    test("work with a code country in a continent Counrty in Method", () => {

      const shippingObjectFactory: ShippingObjectFactory =
      new ShippingObjectFactory();

      const shippementManager: ShippementManager =
      shippingObjectFactory.getShippementManager(ZONESHIPPMENT_LIST_JSON);
      
      const listShippingMethod =  shippementManager.getShippementMethodListByCountryCode("SN", 1000)
  
      expect(listShippingMethod).toMatchObject(LIST_SHIPPING_METHOD_SEN)
  })


  test("work with a code country for everywhere in a continent Counrty in Methode", () => {

    const shippingObjectFactory: ShippingObjectFactory =
    new ShippingObjectFactory();

    const shippementManager: ShippementManager =
    shippingObjectFactory.getShippementManager(ZONESHIPPMENT_LIST_JSON);
    
    const listShippingMethod =  shippementManager.getShippementMethodListByCountryCode("CH", 1000)

    expect(listShippingMethod).toMatchObject(LIST_SHIPPING_METHOD_EVERYWHERE)
})
})