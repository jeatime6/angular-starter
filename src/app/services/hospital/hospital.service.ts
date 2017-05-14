import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthBaseService } from '../auth/auth-base.service';
import { BaseUrl } from '../../environment';

import { ConceptHospitalModel, HospitalConfigHelper } from '../../models/HospitalConfigModel';

import {
    SequencePaganitionViewModel,
    T_ConceptDetailViewModel,
    ProvinceAndCityDataViewModel
} from 'crabyter-p0-server/ViewModel';

import _ from 'lodash';
import pinyin from 'pinyin';

@Injectable()
export class HospitalService {

    constructor(public authBaseService: AuthBaseService) {

    }

    /**
     * 根据配置信息创建医院实体
     * @memberOf HospitalService
     */
    public createConceptHospitalModel(hospital: ConceptHospitalModel) {
        return <T_ConceptDetailViewModel>
            {
                Attributes: [{
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.TypeAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.TypeAttrModel,
                    AttributeName: HospitalConfigHelper.TypeAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.TypeAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalType,
                    ControlType: HospitalConfigHelper.TypeAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.TypeAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.TypeAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.ProvinceAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.ProvinceAttrModel,
                    AttributeName: HospitalConfigHelper.ProvinceAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.ProvinceAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalProvince,
                    ControlType: HospitalConfigHelper.ProvinceAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.ProvinceAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.ProvinceAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.CityAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.CityAttrModel,
                    AttributeName: HospitalConfigHelper.CityAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.CityAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalCity,
                    ControlType: HospitalConfigHelper.CityAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.CityAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.CityAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.CountyAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.CountyAttrModel,
                    AttributeName: HospitalConfigHelper.CountyAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.CountyAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalCounty,
                    ControlType: HospitalConfigHelper.CountyAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.CountyAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.CountyAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.LevelAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.LevelAttrModel,
                    AttributeName: HospitalConfigHelper.LevelAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.LevelAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalLevel,
                    ControlType: HospitalConfigHelper.LevelAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.LevelAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.LevelAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.AddressAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.AddressAttrModel,
                    AttributeName: HospitalConfigHelper.AddressAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.AddressAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalAddress,
                    ControlType: HospitalConfigHelper.AddressAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.AddressAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.AddressAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }, {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.BedCountAttrModel.AttributeID,
                    ConceptTypeAttribute: HospitalConfigHelper.BedCountAttrModel,
                    AttributeName: HospitalConfigHelper.BedCountAttrModel.AttributeName,
                    AttributeType: HospitalConfigHelper.BedCountAttrModel.AttributeType,
                    AttributeValue: hospital.HospitalBedCount,
                    ControlType: HospitalConfigHelper.BedCountAttrModel.ControlType,
                    OptionItems: HospitalConfigHelper.BedCountAttrModel.OptionItems,
                    IsMulti: HospitalConfigHelper.BedCountAttrModel.IsMulti,
                    RelatedConceptIDs: [],
                    AttributeSort: 0
                }
                ],
                Synonymes: [],
                ConceptDefinition: hospital.ConceptDefinition,
                ConceptTypeID: HospitalConfigHelper.ConceptTypeModel.ConceptTypeID,
                ConceptTypeName: HospitalConfigHelper.ConceptTypeModel.ConceptTypeName,
                ConceptName: hospital.ConceptName,
                ConceptNamePy: this.getFirstLetter(hospital.ConceptName),
                ConceptNameEn: "",
                ConceptCode: hospital.ConceptCode,
                ConceptNameAb: hospital.ConceptNameAb,
                ConceptID: ""
            };
    }


    /**
     * 创建医院信息实体
     * 
     * @param {T_ConceptDetailViewModel} conceptDetail 
     * @returns 
     * 
     * @memberOf HospitalService
     */
    public createHospitalModel(conceptDetail: T_ConceptDetailViewModel) {
        let hospital = <ConceptHospitalModel>{};
        if (!_.isNil(conceptDetail)) {
            hospital.ConceptID = conceptDetail.ConceptID;
            hospital.ConceptCode = conceptDetail.ConceptCode;
            hospital.ConceptNameAb = conceptDetail.ConceptNameAb;
            hospital.ConceptName = conceptDetail.ConceptName;
            hospital.ConceptDefinition = conceptDetail.ConceptDefinition;
            // 属性值
            conceptDetail.Attributes.forEach((attrbute) => {
                switch (attrbute.ConceptTypeAttrID) {
                    case HospitalConfigHelper.AddressAttrModel.AttributeID: {
                        hospital.HospitalAddress = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.BedCountAttrModel.AttributeID: {
                        hospital.HospitalBedCount = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.CityAttrModel.AttributeID: {
                        hospital.HospitalCity = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.CountyAttrModel.AttributeID: {
                        hospital.HospitalCounty = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.LevelAttrModel.AttributeID: {
                        hospital.HospitalLevel = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.ProvinceAttrModel.AttributeID: {
                        hospital.HospitalProvince = attrbute.AttributeValue;
                    }; break;
                    case HospitalConfigHelper.TypeAttrModel.AttributeID: {
                        hospital.HospitalType = attrbute.AttributeValue;
                    }; break;
                    default: break;
                }
            });
        }
        return hospital;
    }

    /**
     * 医院列表
     * 
     * @param {number} [pageNum=1] 
     * @param {number} [pageSize=10] 
     * @returns 
     * 
     * @memberof HospitalService
     */
    public getHospitals(pageNum: number = 1, pageSize: number = 10) {
        return this.authBaseService
            .AuthGet(this.createApiUrl(`/cencepts/hospital/${pageNum}/${pageSize}`))
            .map((rep: Response) => rep.json() as SequencePaganitionViewModel);
    }

    /**
     * 添加医院信息
     * 
     * @param {T_ConceptDetailViewModel} hospital 
     * @returns 
     * 
     * @memberof HospitalService
     */
    public addHospital(hospital: T_ConceptDetailViewModel) {
        return this.authBaseService
            .AuthPost(this.createApiUrl(`/concepts`), hospital)
            .map((rep: Response) => rep.json() as T_ConceptDetailViewModel);
    }

    /**
     * 删除概念
     * 
     * @param {string} hospitalId
     * @returns
     * 
     * @memberof HospitalService
     */
    public deleteHospital(hospitalId: string) {
        return this.authBaseService
            .AuthDelete(this.createApiUrl(`/concepts/${hospitalId}`))
            .map((rep: Response) => rep.json());
    }

    /**
     * 修改医院信息
     * 
     * @param {string} hospitalId
     * @param {T_ConceptDetailViewModel} hospital
     * @returns
     *
     * @memberof HospitalService
     */
    public updateHospital(hospitalId: string, hospital: T_ConceptDetailViewModel) {
        return this.authBaseService
            .AuthPut(this.createApiUrl(`/concepts/${hospitalId}`), hospital)
            .map((rep: Response) => rep.json() as T_ConceptDetailViewModel);
    }

    /**
     * 获取单个医院详细信息
     *
     * @param {string} hospitalId
     * @returns
     *
     * @memberof HospitalService
     */
    public getHospital(hospitalId: string) {
        return this.authBaseService
            .AuthGet(this.createApiUrl(`/concepts/${hospitalId}`))
            .map((rep: Response) => rep.json() as T_ConceptDetailViewModel);
    }

    /**
     * 省市信息
     * 
     * @param {string} [parentId] 
     * @returns 
     * 
     * @memberOf HospitalService
     */
    public getProvinceInfo(parentId: string = null) {
        return this.authBaseService.AuthGet(this.createApiUrl(`/concepts/provinceAndCity/${parentId}`))
            .map((rep: Response) => rep.json().result as ProvinceAndCityDataViewModel[]);
    }

    /**
     * 创建API地址
     * 
     * @private
     * @param {string} apiUrl 
     * @returns {string} 
     * 
     * @memberof HospitalService
     */
    private createApiUrl(apiUrl: string): string {
        return `${BaseUrl}${apiUrl}`;
    }


    /**
     * 汉字转拼音
     * 
     * @private
     * @param {string} source 
     * @returns 
     * 
     * @memberOf HospitalService
     */
    private getFirstLetter(source: string) {
        let arrayLetter = pinyin(source, { style: pinyin.STYLE_FIRST_LETTER });
        let res = '';
        arrayLetter.forEach((element) => {
            res = `${res}${element}`;
        });
        return res;
    }

}