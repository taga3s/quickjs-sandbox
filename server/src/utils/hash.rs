use std::hash::Hasher;
use std::hash::{DefaultHasher, Hash};

pub fn calculate<T: Hash>(t: &T) -> u64 {
    let mut s = DefaultHasher::new();
    t.hash(&mut s);
    s.finish()
}
