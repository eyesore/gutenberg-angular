import { Slugable, Namable } from './generic';

export interface IStatus extends Slugable, Namable {
    private: boolean;
    protected: boolean;
    public: boolean;
    queryable: boolean;
    show_in_list: boolean;
}
