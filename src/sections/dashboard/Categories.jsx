import { Card, CardContent, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { NotFoundAvatar } from 'src/images';
import { info_icon } from './icons';
import { useSnackbar } from 'notistack';

function Categories({ categories, onSelectedCategories }) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  // const [selected, setSelected] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCategorySelection = (id) => {
    // Check if the category is already selected
    if (selectedCategoryIds.includes(id)) {
      // remove the selected category ID from the array
      setSelectedCategoryIds(selectedCategoryIds.filter((categoryId) => categoryId !== id));
      return;
    }
    // Check if the maximum number of selected categories is reached
    if (selectedCategoryIds.length >= 6) {
      enqueueSnackbar('لا يمكنك اختيار اكثر من 6 فئات', { variant: 'error' });
      return;
    }
    // Add the selected category ID to the array
    setSelectedCategoryIds([...selectedCategoryIds, id]);
  };

  useEffect(() => {
    onSelectedCategories(selectedCategoryIds);
  }, [onSelectedCategories, selectedCategoryIds]);
  return (
    <>
      {categories.length > 0 && (
        <div className="sm:p-4 h-full bg-transparent rounded-3xl my-10">
          <div>
            <p
              style={{
                fontFamily: 'Noto Kufi Arabic, sans-serif',
              }}
              className="text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 font-bold text-center"
            >
              الفئات الدائمة
            </p>
            {/* show categories 6 per row with same size categories_data data from constants*/}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories?.map((category, index) => (
                <div onClick={() => handleCategorySelection(category?.id)}>
                  <CategoryCard
                    info={category?.info}
                    avatar={category?.avatar}
                    title={category.name}
                    icon={info_icon}
                    button_text={category?.name}
                    selected={selectedCategoryIds.includes(category?.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {categories.length === 0 && (
        <CategoryCard avatar={NotFoundAvatar} title="الفئات الدائمة" icon={info_icon} button_text="لا يوجد فئات" />
      )}
    </>
  );
}

export default Categories;
