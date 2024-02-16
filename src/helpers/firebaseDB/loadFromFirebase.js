import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const loadCategories = async () => {
  const collectionRef = collection(FirebaseDB, "/categories/");
  const docs = await getDocs(collectionRef);
  const categories = [];
  docs.forEach((category) => {
    categories.push({ id: category.id, ...category.data() });
  });
  return categories;
};
export const loadProducts = async () => {
  const collectionRef = collection(FirebaseDB, "/products/");
  const docs = await getDocs(collectionRef);
  const products = [];
  docs.forEach((product) => {
    products.push({ id: product.id, ...product.data() });
  });
  return products;
};
export const loadBranches = async () => {
  const collectionRef = collection(FirebaseDB, "/branches/");
  const docs = await getDocs(collectionRef);
  const branches = [];
  docs.forEach((branch) => {
    branches.push({ id: branch.id, ...branch.data() });
  });
  return branches;
};
export const loadSuppliers = async () => {
  const collectionRef = collection(FirebaseDB, "/suppliers/");
  const docs = await getDocs(collectionRef);
  const suppliers = [];
  docs.forEach((supplier) => {
    suppliers.push({ id: supplier.id, ...supplier.data() });
  });
  return suppliers;
};
export const loadPosts = async () => {
  const collectionRef = collection(FirebaseDB, "/posts/");
  const docs = await getDocs(collectionRef);
  const posts = [];
  docs.forEach((post) => {
    posts.push({ id: post.id, ...post.data() });
  });
  return posts;
};
