import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import StorageRepository from '../../repositories/storage/storage.repo'; // step 1
import SearchpageViewControl from '../searchpage/searchpage.vc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');

    context = {
        posts: <Array<models.IBlogPost>>[],
        composeView: HomeViewControl,
        title: '',
        phone: '',
        email: '',
        college: '',
        friends: <any>[]
    };
    
    constructor(private storageRepo: StorageRepository) {
        super();
    }
    
    submit(): void {
        console.log('submitting blog post!');
        let blogPost: models.IBlogPost = {
            title: this.context.title,
            phone: this.context.phone,
            email: this.context.email,
            college: this.context.college
        };
        this.storageRepo.submitPost(blogPost).then((success) => {
            console.log(success);
            this.navigator.navigate(HomeViewControl);
        }, (err) => {
            console.log(err);
        });
    }

    
    navigatedTo(): void {
        console.log('navigated to!');
        this.storageRepo.getAllPosts().then((success) => {
            console.log('get posts returned!');
            console.log(success);
            this.context.posts = success;
        }, (err) => {
            console.log('something went wrong!');
            console.log(err);
        });
    }
    
    goToCompose(): void {
        this.navigator.navigate(SearchpageViewControl);
    }
    
}

register.viewControl('home-vc', HomeViewControl, [StorageRepository]); // step 2