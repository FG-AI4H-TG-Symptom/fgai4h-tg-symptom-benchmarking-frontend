import React from "react";
import AttributeMultiSelect from "./AttributeMultiSelect";
import AttributeSingleSelect from "./AttributeSingleSelect";

const AttributeSelect: React.FC<any> = ({
  possibleValues,
  selectedValue,
  valuesOptions,
  attributeId,
  isMulti,
  attributesOptions,
  magicName,
  selectAttr,
}) => {
  const onAttributeChange = (e) => {
    const oldId = attributeId;
    const newId = e[0].target.value;

    selectAttr(oldId, newId);
  };

  if (isMulti) {
    return (
      <AttributeMultiSelect
        possibleValues={possibleValues}
        magicName={magicName}
        selectedAttribute={attributeId}
        onAttributeChange={onAttributeChange}
        selectedValue={selectedValue}
        attributesOptions={attributesOptions}
        valuesOptions={valuesOptions}
      />
    );
  }

  return (
    <AttributeSingleSelect
      magicName={magicName}
      selectedAttribute={attributeId}
      onAttributeChange={onAttributeChange}
      selectedValue={selectedValue}
      attributesOptions={attributesOptions}
      valuesOptions={valuesOptions}
    />
  );
};

export default AttributeSelect;
