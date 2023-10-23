import logo from './logo.svg';
import './App.css';
import { useFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';


function App() {

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('image', file);

    // If you want to show a preview, you can set it here
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        formik.setFieldValue('imagePreview', reader.result);
      };
    }
  };

  const onSubmit = async (values) => {
    try {
      const base64Image = await getBase64(values.image);
      console.log('Base64 Image:', base64Image);
      // You can now do something with the base64Image, like sending it to a server.
    } catch (error) {
      console.error('Error converting to base64:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: Yup.object().shape({
      image: Yup.mixed()
        .required("required"),
    }),
    onSubmit

  })

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
          {formik.errors.image && formik.touched.image && (
            <div>{formik.errors.image}</div>
          )}
        </div>

        {formik.values.imagePreview && (
          <div>
            <img src={formik.values.imagePreview} style={{ height: '200px' }} alt="Preview" />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
