import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import StorageRepository from '../../repositories/storage/storage.repo';

export default class SearchpageViewControl extends BaseViewControl {
    templateString: string = require('./searchpage.vc.html');

    context = {
        post: <models.IBlogPost>{}
    };
    
    constructor(private postRepo: StorageRepository) {
        super();
    }
    
    navigatedTo(parameters: any): void {
        let idValue: string = parameters.someid;
        this.postRepo.getPost(idValue).then((success) => {
            console.log(success);
            this.context.post = success;
        }, (err) => {
            console.log(err);
        });
    }
}

register.viewControl('searchpage-vc', SearchpageViewControl, [StorageRepository]);