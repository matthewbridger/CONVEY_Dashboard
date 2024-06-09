import { defineStore } from 'pinia';
import authController from '../api/controllers/auth'
import userController from '../api/controllers/user'

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: null as any,
        session_id: null as any,
    }),
    
    actions: {
        clear_user() {
            this.user = null;
            this.session_id = null;
        },

        set_user(user: object) {
            this.user = user;
        },

        set_session_id(session_id: object) {
            this.session_id = session_id;
        },

        async update_account_db(user: object): Promise<any> {
            try {
                const response = await userController.edit(user);

                if(response) {
                    this.set_user(response.user);

                    return {
                        success: true,
                    };
                }
            }
            catch(error: any) {
                return {
                    success: false,
                    error_message: error.response.data.error
                }
            }
        },

        async sign_up(user: any): Promise<any> {
            try {
                const response = await authController.sign_up(user)
                
                if(response) {
                    this.set_user(response.user);
                    this.set_session_id(response.session_id);
                    return {
                        success: true,
                    };
                }
            }
            catch(error: any) {
                return {
                    success: false,
                    error_message: error.response.data.error
                };
            }
        },

        async sign_in(email: string, password: string): Promise<any> {
            try {
                const response = await authController.sign_in({ email, password })
                
                if(response) {
                    this.set_user(response.data.user);
                    this.set_session_id(response.data.session_id);
                    return {
                        success: true,
                    };
                }
            }
            catch(error: any) {
                return {
                    success: false,
                    error_message: error.response.data.error
                };
            }
        },

        async sign_out(): Promise<any> {
            try {
                const response = await authController.sign_out();

                if(response) {
                    this.user = null;
                    this.session_id = null;
                    return {
                        success: true,
                    };
                }
            }
            catch(error: any) {
                return {
                    success: false,
                    error_message: error.response.data.error
                }
            }
        },

        async is_current_session_valid(): Promise<boolean> {
            try {
                const response = await authController.validate_session(this.session_id, this.user);

                if(response?.data?.id) {
                    this.set_user(response.data);
                    this.set_session_id(response.data.session_id);

                    return true;
                }
                else {
                    this.clear_user();
                    return false;
                }
            }
            catch(error: any) {
                this.clear_user();

                return false;
            }
        }
    }
});
