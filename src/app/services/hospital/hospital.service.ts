import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthBaseService } from '../auth/auth-base.service';
import { BaseUrl } from '../../environment';

@Injectable()
export class HospitalService {

    constructor(public authBaseService: AuthBaseService) { }

    /**
     * 获取医院列表
     */
    public getHospitals() {
        // /api/cencepts/hospital/{pageNum}/{pageSize}
        return this.authBaseService.AuthGet('').map((rep: Response) => rep.json());
    }

    /**
     * 修改医院
     */
    public addHospital(hospital) {
        return this.authBaseService.AuthPost(`${BaseUrl}`, hospital).map((rep: Response) => rep.json());
    }

    /**
     * 修改医院
     */
    public updateHospital(hospital) {
        return this.authBaseService.AuthPut(`${BaseUrl}`, hospital).map((rep: Response) => rep.json());
    }
}