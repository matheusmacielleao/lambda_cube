interface Repository<R,T> {

set(key: string, value: R): Promise<T>;
    
get(key: string): Promise< T|null >;
    
}
export default Repository;