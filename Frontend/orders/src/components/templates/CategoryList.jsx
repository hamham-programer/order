import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getParentCategories, deleteCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import styles from "./categoryList.module.css";
import toast from "react-hot-toast";

function CategoryList() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(["get-categories"], getParentCategories);

    const mutation = useMutation(deleteCategory, {
        onSuccess: () => {
            // پس از حذف موفقیت‌آمیز، داده‌ها را دوباره بارگذاری می‌کنیم
            queryClient.invalidateQueries(["get-categories"]);
        },
        onError: () => {
            alert("مشکلی در حذف دسته‌بندی پیش آمد.");
        }
    });

    const handleDelete = (categoryId) => {
        if (window.confirm("آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟")) {
            mutation.mutate(categoryId);
        }
    };
    
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={styles.list}>
            <h3>لیست دسته‌بندی‌ها:</h3>
            {data?.data?.length > 0 ? (
                <ul>
                    {data?.data.map((category) => (
                        <li key={category._id}>
                            <img src={`/${category.icon}.svg`} alt={`${category.name} icon`} className={styles.icon} />
                            <span>{category.name}</span> 
                            <span>{category.slug}</span>
                            <button 
                                onClick={() => handleDelete(category._id)} 
                                className={styles.deleteButton}
                                disabled={mutation.isLoading}
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>هیچ دسته‌بندی‌ای موجود نیست.</p>
            )}
        </div>
    );
}

export default CategoryList;
