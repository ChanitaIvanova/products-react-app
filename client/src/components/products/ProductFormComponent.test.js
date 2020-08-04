import React from 'react';
import ProductFormComponent from './ProductFormComponent';
import { shallow } from 'enzyme';

describe('WHEN displaySubmitButton property is false', () => {
    it('does not render the submit button', () => {
        const wrapper = shallow(
            <ProductFormComponent displaySubmitButton={false} product={{}}/>,
        );
        const submitButtonElement = wrapper.find("button.primary-btn");
        expect(submitButtonElement.exists()).toEqual(false);
    });
});

describe('WHEN displaySubmitButton property is true', () => {
    it('render the submit button', () => {
        const wrapper = shallow(
            <ProductFormComponent displaySubmitButton={true} product={{}}/>,
        );
        const submitButtonElement = wrapper.find("button.primary-btn");
        expect(submitButtonElement.text().trim()).toEqual('Add');
    });

    describe('WHEN submit is invoked', () => {
        describe('WHEN the input is not valid', () => {
            it('does not call the submit', () => {
                let product;
                const handleSubmit = (newProduct) => {
                    product = newProduct;
                }
                const wrapper = shallow(
                    <ProductFormComponent 
                    displaySubmitButton={true} 
                    product={{
                        name: '',
                        price: 0,
                        currency: 'USD'
                    }}
                    handleSubmit={handleSubmit}/>,
                );
                const submitButtonElement = wrapper.find("button.primary-btn");
                submitButtonElement.simulate('click', {preventDefault: () => {}});
                expect(product).toBeUndefined();
            });
        });

        describe('WHEN the input is valid', () => {
            it('does calls the submit', () => {
                let product;
                const handleSubmit = (newProduct) => {
                    product = newProduct;
                }
                const wrapper = shallow(
                    <ProductFormComponent 
                    displaySubmitButton={true} 
                    product={{
                        name: '',
                        price: 0,
                        currency: 'USD'
                    }}
                    handleSubmit={handleSubmit}/>,
                );
                const nameInputElement = wrapper.find("#product-name");
                nameInputElement.simulate('change', {
                    target: { name: 'name', value: 'new name' }
                });

                const priceInputElement = wrapper.find("#product-price");
                priceInputElement.simulate('change', {
                    target: { name: 'price', value: 50 }
                });
                const submitButtonElement = wrapper.find("button.primary-btn");
                submitButtonElement.simulate('click', {preventDefault: () => {}});
                expect(product).toEqual({
                        name: 'new name',
                        price: 50,
                        currency: 'USD'
                });
            });
        });
    });
    
});

describe('WHEN onProductChange is provided', () => {
    describe('WHEN the name input is changed', () => {
        it('calls onProductChange', () => {
            let product;
            const onProductChange = (newProduct) => {
                product = newProduct;
            }
            const wrapper = shallow(
                <ProductFormComponent 
                product={{
                    name: '',
                    price: 0,
                    currency: 'USD'
                }}
                onProductChange={onProductChange}/>,
            );
            const nameInputElement = wrapper.find("#product-name");
            nameInputElement.simulate('change', {
                target: { name: 'name', value: 'new name' }
            });
            expect(product).toEqual({
                    name: 'new name',
                    price: 0,
                    currency: 'USD'
            });
        });
    });

    describe('WHEN the price input is changed', () => {
        it('calls onProductChange', () => {
            let product;
            const onProductChange = (newProduct) => {
                product = newProduct;
            }
            const wrapper = shallow(
                <ProductFormComponent 
                product={{
                    name: '',
                    price: 0,
                    currency: 'USD'
                }}
                onProductChange={onProductChange}/>,
            );

            const priceInputElement = wrapper.find("#product-price");
            priceInputElement.simulate('change', {
                target: { name: 'price', value: 50 }
            });
            expect(product).toEqual({
                    name: '',
                    price: 50,
                    currency: 'USD'
            });
        });
    });

    describe('WHEN the currency input is changed', () => {
        it('calls onProductChange', () => {
            let product;
            const onProductChange = (newProduct) => {
                product = newProduct;
            }
            const wrapper = shallow(
                <ProductFormComponent 
                product={{
                    name: '',
                    price: 0,
                    currency: 'USD'
                }}
                onProductChange={onProductChange}/>,
            );

            const priceInputElement = wrapper.find("#product-currency");
            priceInputElement.simulate('change', {
                target: { name: 'currency', value: 'BGN' }
            });
            expect(product).toEqual({
                    name: '',
                    price: 0,
                    currency: 'BGN'
            });
        });
    });
});

describe('WHEN the name is changed', () => {
  describe("WHEN onBlur is called", () => {
    describe('WHEN the name is not valid', () => {
        describe('WHEN onFormValidationChange is provided', () => {
            it('marks the input as invalid and calls onFormValidationChange with false', () => {
                let isValid = true;
                const onFormValidationChange = (valid) => {
                    isValid = valid;
                }
                const wrapper = shallow(
                    <ProductFormComponent 
                    product={{
                        name: 'name',
                        price: 0,
                        currency: 'USD'
                    }}
                    onFormValidationChange={onFormValidationChange}/>,
                );

                const nameInputElement = wrapper.find("#product-name");
                nameInputElement.simulate('change', {
                    target: { name: 'name', value: '' }
                });
                nameInputElement.simulate('blur');
                expect(wrapper.state().isNameValid).toEqual(false);
                expect(isValid).toEqual(false);
            });
        });

        describe('WHEN onFormValidationChange is NOT provided', () => {
            it('marks the input as invalid', () => {
                const wrapper = shallow(
                    <ProductFormComponent 
                    product={{
                        name: 'name',
                        price: 0,
                        currency: 'USD'
                    }}/>,
                );

                const nameInputElement = wrapper.find("#product-name");
                nameInputElement.simulate('change', {
                    target: { name: 'name', value: '' }
                });
                nameInputElement.simulate('blur');
                expect(wrapper.state().isNameValid).toEqual(false);
            });
        });
    });

    describe('WHEN the name is valid', () => {
        describe('WHEN onFormValidationChange is provided', () => {
            it('marks the input as valid and calls onFormValidationChange with true', () => {
                let isValid = false;
                const onFormValidationChange = (valid) => {
                    isValid = valid;
                }
                const wrapper = shallow(
                    <ProductFormComponent 
                    product={{
                        name: '',
                        price: 0,
                        currency: 'USD'
                    }}
                    onFormValidationChange={onFormValidationChange}/>,
                );

                const nameInputElement = wrapper.find("#product-name");
                nameInputElement.simulate('change', {
                    target: { name: 'name', value: 'name' }
                });
                nameInputElement.simulate('blur');
                expect(wrapper.state().isNameValid).toEqual(true);
                expect(isValid).toEqual(true);
            });
        });

        describe('WHEN onFormValidationChange is NOT provided', () => {
            it('marks the input as valid', () => {
                const wrapper = shallow(
                    <ProductFormComponent 
                    product={{
                        name: '',
                        price: 0,
                        currency: 'USD'
                    }}/>,
                );

                const nameInputElement = wrapper.find("#product-name");
                nameInputElement.simulate('change', {
                    target: { name: 'name', value: 'name' }
                });
                nameInputElement.simulate('blur');
                expect(wrapper.state().isNameValid).toEqual(true);
            });
        });
    });
  });
});

describe('WHEN the price is changed', () => {
    describe("WHEN onBlur is called", () => {
      describe('WHEN the price is not valid', () => {
          describe('WHEN onFormValidationChange is provided', () => {
              it('marks the input as invalid and calls onFormValidationChange with false', () => {
                  let isValid = true;
                  const onFormValidationChange = (valid) => {
                      isValid = valid;
                  }
                  const wrapper = shallow(
                      <ProductFormComponent 
                      product={{
                          name: '',
                          price: 25,
                          currency: 'USD'
                      }}
                      onFormValidationChange={onFormValidationChange}/>,
                  );
  
                  const priceInputElement = wrapper.find("#product-price");
                  priceInputElement.simulate('change', {
                      target: { name: 'price', value: 0 }
                  });
                  priceInputElement.simulate('blur');
                  expect(wrapper.state().isPriceValid).toEqual(false);
                  expect(isValid).toEqual(false);
              });
          });
  
          describe('WHEN onFormValidationChange is NOT provided', () => {
              it('marks the input as invalid', () => {
                  const wrapper = shallow(
                      <ProductFormComponent 
                      product={{
                          name: '',
                          price: 25,
                          currency: 'USD'
                      }}/>,
                  );
  
                  const priceInputElement = wrapper.find("#product-price");
                  priceInputElement.simulate('change', {
                      target: { name: 'price', value: 0 }
                  });
                  priceInputElement.simulate('blur');
                  expect(wrapper.state().isPriceValid).toEqual(false);
              });
          });
      });
  
      describe('WHEN the price is valid', () => {
          describe('WHEN onFormValidationChange is provided', () => {
              it('marks the input as valid and calls onFormValidationChange with true', () => {
                  let isValid = false;
                  const onFormValidationChange = (valid) => {
                      isValid = valid;
                  }
                  const wrapper = shallow(
                      <ProductFormComponent 
                      product={{
                          name: '',
                          price: 0,
                          currency: 'USD'
                      }}
                      onFormValidationChange={onFormValidationChange}/>,
                  );
  
                  const priceInputElement = wrapper.find("#product-price");
                  priceInputElement.simulate('change', {
                      target: { name: 'price', value: 25 }
                  });
                  priceInputElement.simulate('blur');
                  expect(wrapper.state().isPriceValid).toEqual(true);
                  expect(isValid).toEqual(true);
              });
          });
  
          describe('WHEN onFormValidationChange is NOT provided', () => {
              it('marks the input as valid', () => {
                  const wrapper = shallow(
                      <ProductFormComponent 
                      product={{
                          name: '',
                          price: 0,
                          currency: 'USD'
                      }}/>,
                  );
  
                  const priceInputElement = wrapper.find("#product-price");
                  priceInputElement.simulate('change', {
                      target: { name: 'napriceme', value: 25 }
                  });
                  priceInputElement.simulate('blur');
                  expect(wrapper.state().isNameValid).toEqual(true);
              });
          });
      });
    });
  })
