import { T_ConceptTypeViewModel, T_ConceptTypeAttributeViewModel } from 'crabyter-p0-server/ViewModel';

/**
 * 医院配置信息实体
 * 
 * @export
 * @class HospitalConfigModel
 */
export class HospitalConfigModel {
    public ConceptTypeModel: T_ConceptTypeViewModel;
    public TypeAttrModel: T_ConceptTypeAttributeViewModel;
    public ProvinceAttrModel: T_ConceptTypeAttributeViewModel;
    public CityAttrModel: T_ConceptTypeAttributeViewModel;
    public CountyAttrModel: T_ConceptTypeAttributeViewModel;
    public LevelAttrModel: T_ConceptTypeAttributeViewModel;
    public AddressAttrModel: T_ConceptTypeAttributeViewModel;
    public BedCountAttrModel: T_ConceptTypeAttributeViewModel;
}

/**
 * 医院实体
 * 
 * @export
 * @class ConceptHospitalModel
 */
export class ConceptHospitalModel {
    ConceptName: string;
    ConceptNameAb: string;
    ConceptCode: string;
    ConceptDefinition: string;
    HospitalType: string;
    HospitalLevel: string;
    HospitalProvince: string;
    HospitalCity: string;
    HospitalCounty: string;
    HospitalAddress: string;
    HospitalBedCount:string;
}

/**
 * 医院配置信息
 */
export const HospitalConfigHelper = <HospitalConfigModel>
    {
        ConceptTypeModel: <T_ConceptTypeViewModel>{
            ConceptTypeID: 'CT0000000109',
            ConceptTypeName: '医院类型'
        },
        TypeAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000183",
            AttributeName: "类型",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        ProvinceAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000184",
            AttributeName: "省",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        CityAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000185",
            AttributeName: "市",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        CountyAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000186",
            AttributeName: "县",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        LevelAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000187",
            AttributeName: "等级",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        AddressAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000188",
            AttributeName: "地址",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        },
        BedCountAttrModel: <T_ConceptTypeAttributeViewModel>{
            ConceptTypeID: "CT0000000109",
            AttributeID: "CTA000000189",
            AttributeName: "床位数",
            AttributeType: 1,
            ControlType: 1,
            OptionItems: [],
            IsMulti: false,
            AttributeSort: 0,
            RelatedConceptProperties: []
        }
    };

