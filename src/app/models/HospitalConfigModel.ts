import { Map } from 'immutable';

/**
 * 医院配置信息实体
 * 
 * @export
 * @class HospitalConfigModel
 */
export class HospitalConfigModel {
    public ConceptTypeID: string;
    public TypeAttrId: string;
    public ProvinceAttrId: string;
    public CityAttrId: string;
    public CountyAttrId: string;
    public LevelAttrId: string;
    public AddressAttrId: string;
    public BedCountAttrId: string;
}

/**
 * 医院配置信息
 */
export const HospitalConfigMap = Map(<HospitalConfigModel>
    {
        ConceptTypeID: 'CT0000000109',
        TypeAttrId: 'CTA000000180',
        ProvinceAttrId: 'CTA000000181',
        CityAttrId: 'CTA000000259',
        CountyAttrId: 'CTA000000260',
        LevelAttrId: 'CTA000000261',
        AddressAttrId: 'CTA000000262',
        BedCountAttrId: 'CTA000000263',
    });
