import { ApolloError, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { UpdateRestaurant } from '../../lib/apollo';
import { Restaurant } from '../../lib/types/restaurants';
import styles from '../../styles/Home.module.css';

type Props = {
  restaurant: Restaurant;
  toggleEditForm: () => void;
  // imagesUrl?: string;
};

export type UpdateRestaurantResponseBody = {
  errors?: ApolloError[] | undefined;
  data?: any;
};

const initialValues = {
  name: '',
  address: '',
  amenity: '',
  cuisine: '',
};

export default function RestaurantForm(props: Props) {
  const router = useRouter();
  const [formValues, setFormValues] = useState<any>(initialValues);
  const [updateRestaurant, { data, loading, error }] =
    useMutation(UpdateRestaurant);
  const [errors, setErrors] = useState<ApolloError[]>([]);

  useEffect(() => {
    const newValues = { ...formValues, ...props.restaurant };
    const serializedValues = Object.entries(newValues).reduce(
      (previous: any, current) => {
        const [key, value] = current;
        // console.log(key, key in initialValues);

        // if (key in initialValues) {
        return {
          ...previous,
          [key]: value === null ? '' : value,
        };
        // }
      },
      {},
    );

    // console.log(serializedValues);
    setFormValues(serializedValues);
  }, []);

  // if (loading) return 'Submitting...';

  // if (error) {
  //   return `Submission error! ${error.message}`;
  // }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const updateRestaurantResponse = await updateRestaurant({
      variables: {
        changes: {
          // id: formValues.id,
          name: formValues.name,
          address: formValues.address,
          amenity: formValues.amenity,
          cuisine: formValues.cuisine,
        },
        id: formValues.id,
      },
    });
    // console.log(`Submitting Name ${event.currentTarget}`, formValues);
    const updateRestaurantResponseBody =
      updateRestaurantResponse as UpdateRestaurantResponseBody;

    // console.log(
    //   'updateRestaurantResponseBody',
    //   updateRestaurantResponseBody.data.update_restaurants_by_pk,
    //   updateRestaurantResponseBody.errors,
    // );

    // if ('errors' in updateRestaurantResponseBody) {
    //   setErrors(updateRestaurantResponseBody.errors);
    //   return;
    // }
    props.toggleEditForm();
    await router.push(
      `/restaurants/${updateRestaurantResponseBody.data.update_restaurants_by_pk.id}`,
    );
  };

  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();
    const { name, value } = e.target;

    // console.log('handleChange', e, name, value);

    setFormValues((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <form
        // ref={formRef}
        onSubmit={handleSubmit}
        className={styles.innerForm}
      >
        <label>
          Name:
          <input name="name" value={formValues.name} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Amenity:
          <input
            name="amenity"
            value={formValues.amenity}
            onChange={handleChange}
          />
        </label>
        <label>
          Cuisine:
          <input
            name="cuisine"
            value={formValues.cuisine}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" className={styles.buttonForm} />
      </form>
      <div>
        {errors.map((err) => {
          return <div key={`error-${err.message}`}>{err.message}</div>;
        })}
      </div>
    </>
  );
}

/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */
