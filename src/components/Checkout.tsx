import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('dine-in');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  // Dine-in specific state
  const [partySize, setPartySize] = useState(1);
  const [dineInTime, setDineInTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup' 
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';
    
    const dineInInfo = serviceType === 'dine-in' 
      ? `👥 Party Size: ${partySize} person${partySize !== 1 ? 's' : ''}\n🕐 Preferred Time: ${new Date(dineInTime).toLocaleString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })}`
      : '';
    
    const orderDetails = `
🛒 Arios Cafe ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}
${serviceType === 'dine-in' ? dineInInfo : ''}


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE:` : ''}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Arios Cafe!
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/arioscafe?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && contactNumber && 
    (serviceType !== 'delivery' || address) && 
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime)) &&
    (serviceType !== 'dine-in' || (partySize > 0 && dineInTime));

  if (step === 'details') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-primary-base">
        <div className="flex items-center mb-10">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-secondary-accent hover:text-primary-accent transition-all duration-300 font-verdana font-semibold"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-verdana font-bold text-[#2C2C2C] ml-10">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-accent/20">
            <h2 className="text-3xl font-verdana font-bold text-[#2C2C2C] mb-6 pb-4 border-b-2 border-neutral-accent/30">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b-2 border-neutral-accent/20">
                  <div>
                    <h4 className="font-verdana font-bold text-[#2C2C2C]">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm font-verdana text-primary-accent font-semibold">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm font-verdana text-neutral-accent">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm font-verdana text-[#2C2C2C]/70">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-verdana font-bold text-secondary-accent text-lg">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-neutral-accent/30 pt-5">
              <div className="flex items-center justify-between text-3xl font-verdana font-bold text-[#2C2C2C]">
                <span>Total:</span>
                <span className="text-secondary-accent">₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-accent/20">
            <h2 className="text-3xl font-verdana font-bold text-[#2C2C2C] mb-6 pb-4 border-b-2 border-neutral-accent/30">Customer Information</h2>
            
            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-3">Service Type *</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'dine-in', label: 'Dine In', icon: '🪑' },
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 font-verdana font-semibold shadow-md hover:shadow-lg ${
                        serviceType === option.value
                          ? 'border-secondary-accent bg-secondary-accent text-white'
                          : 'border-neutral-accent/40 bg-white text-[#2C2C2C] hover:border-primary-accent'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dine-in Details */}
              {serviceType === 'dine-in' && (
                <>
                  <div>
                    <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Party Size *</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-12 h-12 rounded-lg border-2 border-neutral-accent/40 flex items-center justify-center text-secondary-accent hover:border-primary-accent hover:bg-primary-accent/10 transition-all duration-300 font-verdana font-bold text-xl"
                      >
                        -
                      </button>
                      <span className="text-3xl font-verdana font-bold text-secondary-accent min-w-[4rem] text-center">{partySize}</span>
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.min(20, partySize + 1))}
                        className="w-12 h-12 rounded-lg border-2 border-neutral-accent/40 flex items-center justify-center text-secondary-accent hover:border-primary-accent hover:bg-primary-accent/10 transition-all duration-300 font-verdana font-bold text-xl"
                      >
                        +
                      </button>
                      <span className="text-sm font-verdana text-neutral-accent ml-2">person{partySize !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Preferred Time *</label>
                    <input
                      type="datetime-local"
                      value={dineInTime}
                      onChange={(e) => setDineInTime(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                      required
                    />
                    <p className="text-xs font-verdana text-neutral-accent mt-1">Please select your preferred dining time</p>
                  </div>
                </>
              )}

              {/* Pickup Time Selection */}
              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-3">Pickup Time *</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '5-10', label: '5-10 minutes' },
                        { value: '15-20', label: '15-20 minutes' },
                        { value: '25-30', label: '25-30 minutes' },
                        { value: 'custom', label: 'Custom Time' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-verdana font-semibold shadow-md hover:shadow-lg ${
                            pickupTime === option.value
                              ? 'border-secondary-accent bg-secondary-accent text-white'
                              : 'border-neutral-accent/40 bg-white text-[#2C2C2C] hover:border-primary-accent'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                    
                    {pickupTime === 'custom' && (
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                        placeholder="e.g., 45 minutes, 1 hour, 2:30 PM"
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                      placeholder="e.g., Near McDonald's, Beside 7-Eleven, In front of school"
                    />
                  </div>
                </>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-verdana font-semibold text-[#2C2C2C] mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-accent/40 rounded-lg focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 font-verdana"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                className={`w-full py-5 rounded-lg font-verdana font-bold text-xl transition-all duration-300 transform shadow-lg ${
                  isDetailsValid
                    ? 'bg-secondary-accent text-white hover:bg-primary-accent hover:scale-105 border-2 border-transparent hover:border-secondary-accent/30 hover:shadow-xl'
                    : 'bg-neutral-accent/30 text-neutral-accent cursor-not-allowed border-2 border-neutral-accent/50'
                }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-primary-base">
      <div className="flex items-center mb-10">
        <button
          onClick={() => setStep('details')}
          className="flex items-center space-x-2 text-secondary-accent hover:text-primary-accent transition-all duration-300 font-verdana font-semibold"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
          <span>Back to Details</span>
        </button>
        <h1 className="text-4xl font-verdana font-bold text-[#2C2C2C] ml-10">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-accent/20">
          <h2 className="text-3xl font-verdana font-bold text-[#2C2C2C] mb-6 pb-4 border-b-2 border-neutral-accent/30">Choose Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`p-5 rounded-lg border-2 transition-all duration-300 flex items-center space-x-3 font-verdana font-semibold shadow-md hover:shadow-lg ${
                  paymentMethod === method.id
                    ? 'border-secondary-accent bg-secondary-accent text-white'
                    : 'border-neutral-accent/40 bg-white text-[#2C2C2C] hover:border-primary-accent'
                }`}
              >
                <span className="text-2xl">💳</span>
                <span>{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-primary-accent/10 rounded-lg p-6 mb-6 border-2 border-primary-accent/30">
              <h3 className="font-verdana font-bold text-[#2C2C2C] mb-4 text-lg">Payment Details</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-verdana text-neutral-accent mb-1">{selectedPaymentMethod.name}</p>
                  <p className="font-mono text-[#2C2C2C] font-bold text-lg">{selectedPaymentMethod.account_number}</p>
                  <p className="text-sm font-verdana text-neutral-accent mb-3">Account Name: {selectedPaymentMethod.account_name}</p>
                  <p className="text-2xl font-verdana font-bold text-secondary-accent">Amount: ₱{totalPrice}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={selectedPaymentMethod.qr_code_url} 
                    alt={`${selectedPaymentMethod.name} QR Code`}
                    className="w-36 h-36 rounded-lg border-2 border-secondary-accent/30 shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                  <p className="text-xs font-verdana text-neutral-accent text-center mt-2">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

          {/* Reference Number */}
          <div className="bg-secondary-accent/10 border-2 border-secondary-accent/30 rounded-lg p-5">
            <h4 className="font-verdana font-bold text-[#2C2C2C] mb-2">📸 Payment Proof Required</h4>
            <p className="text-sm font-verdana text-[#2C2C2C]/80">
              After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-accent/20">
          <h2 className="text-3xl font-verdana font-bold text-[#2C2C2C] mb-6 pb-4 border-b-2 border-neutral-accent/30">Final Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-primary-base rounded-lg p-5 border-2 border-neutral-accent/20">
              <h4 className="font-verdana font-bold text-[#2C2C2C] mb-3 text-lg">Customer Details</h4>
              <p className="text-sm font-verdana text-[#2C2C2C]"><span className="font-semibold">Name:</span> {customerName}</p>
              <p className="text-sm font-verdana text-[#2C2C2C]"><span className="font-semibold">Contact:</span> {contactNumber}</p>
              <p className="text-sm font-verdana text-[#2C2C2C]"><span className="font-semibold">Service:</span> {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
              {serviceType === 'delivery' && (
                <>
                  <p className="text-sm text-gray-600">Address: {address}</p>
                  {landmark && <p className="text-sm text-gray-600">Landmark: {landmark}</p>}
                </>
              )}
              {serviceType === 'pickup' && (
                <p className="text-sm text-gray-600">
                  Pickup Time: {pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}
                </p>
              )}
              {serviceType === 'dine-in' && (
                <>
                  <p className="text-sm text-gray-600">
                    Party Size: {partySize} person{partySize !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-600">
                    Preferred Time: {dineInTime ? new Date(dineInTime).toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    }) : 'Not selected'}
                  </p>
                </>
              )}
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-red-100">
                <div>
                  <h4 className="font-medium text-black">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-gray-600">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-black">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-neutral-accent/30 pt-5 mb-6">
            <div className="flex items-center justify-between text-4xl font-verdana font-bold text-[#2C2C2C]">
              <span>Total:</span>
              <span className="text-secondary-accent">₱{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-5 rounded-lg font-verdana font-bold text-xl transition-all duration-300 transform bg-secondary-accent text-white hover:bg-primary-accent hover:scale-105 border-2 border-transparent hover:border-secondary-accent/30 shadow-lg hover:shadow-xl"
          >
            Place Order via Messenger
          </button>
          
          <p className="text-xs font-verdana text-neutral-accent text-center mt-4">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;