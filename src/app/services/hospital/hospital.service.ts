import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthBaseService } from '../auth/auth-base.service';
import { BaseUrl } from '../../environment';

import { ConceptHospitalModel, HospitalConfigHelper } from '../../models/HospitalConfigModel';

import {
    SequencePaganitionViewModel,
    T_ConceptDetailViewModel
} from 'crabyter-p0-server/ViewModel';

import _ from 'lodash';

@Injectable()
export class HospitalService {

    constructor(public authBaseService: AuthBaseService) {

    }

    /**
     * 根据配置信息创建医院实体
     * @memberOf HospitalService
     */
    public createConceptHospitalModel(hospital: ConceptHospitalModel) {
        return <T_ConceptDetailViewModel>{
            Attributes: [
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.TypeAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalType,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.ProvinceAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalProvince,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.CityAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalCity,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.CountyAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalCity,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.LevelAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalLevel,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.AddressAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalAddress,
                    AttributeSort: 0
                },
                {
                    AttributeID: "",
                    ConceptTypeAttrID: HospitalConfigHelper.BedCountAttrModel.AttributeID,
                    AttributeValue: hospital.HospitalBedCount,
                    AttributeSort: 0
                }
            ],
            Synonymes: [],
            ConceptDefinition: hospital.ConceptDefinition,
            ConceptTypeID: HospitalConfigHelper.ConceptTypeModel.ConceptTypeID,
            ConceptName: hospital.ConceptName,
            ConceptNameAb: hospital.ConceptNameAb,
            ConceptCode: hospital.ConceptCode
        };
    }

    public createHospitalModel(conceptDetail: T_ConceptDetailViewModel) {
        let hospital = <ConceptHospitalModel>{};
        if (!_.isNil(conceptDetail)) {
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
}