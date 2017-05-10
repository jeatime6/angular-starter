import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthBaseService } from '../auth/auth-base.service';
import { BaseUrl } from '../../environment';

import {
    SequencePaganitionViewModel,
    T_ConceptDetailViewModel
} from 'crabyter-p0-server/ViewModel';

@Injectable()
export class HospitalService {

    constructor(public authBaseService: AuthBaseService) {

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