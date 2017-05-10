import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthBaseService } from '../auth/auth-base.service';

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
}