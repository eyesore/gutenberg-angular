import { GenericObj } from './generic';

export interface BaseResponser {
    capabilities?: GenericObj;
    description?: string;
    hierarchical?: false;
    labels?: GenericObj;
    name?: string;
    slug?: string;
    taxonomies?: [];
    rest_base?: string;
    supports?: GenericObj;
    viewable?: false;
    _links?: GenericObj;
}
