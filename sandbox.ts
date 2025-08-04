{
  "uuid": "plant-abstract-001",
  "value": "plant",
  "label": "Plant",
  "description": "Abstract base type for all types of plants.",
  "version": 1,
  "staticAttributes": [
    {
      "uuid": "sa1",
      "value": "Plantae",
      "label": "Kingdom",
      "type": "text",
      "required": true
    },
    {
      "id": "sa2",
      "name": "averageHeight",
      "type": "number",
      "required": false
    },
    {
      "id": "sa3",
      "name": "sunExposure",
      "type": "select",
      "required": false,
      "options": [
        {
          "label": "Full Sun",
          "value": "full_sun"
        },
        {
          "label": "Partial Shade",
          "value": "partial_shade"
        },
        {
          "label": "Full Shade",
          "value": "full_shade"
        }
      ]
    }
  ],
  "dynamicAttributes": [
    {
      "id": "da1",
      "name": "bloomColor",
      "type": "text",
      "required": false
    },
    {
      "id": "da2",
      "name": "leafSize",
      "type": "text",
      "required": false
    }
  ]
}