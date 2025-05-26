"use client"

import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import {submitRegistration} from "@/app/actions/registration"


export default function Registration() {
  const lang = "en"
const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    DOB: "",
    course: "",
    state: "",
    city: "",
    file: null,
    identity: "",
    consent: false,
  })


  const [showDialog, setShowDialog] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef =  useRef(null)

  const stateCityMap = {
    "West Bengal": ["Kolkata"],
    Karnataka: ["Bangalore"],
    Maharashtra: ["Mumbai"],
    Delhi: ["Delhi"],
  }

  const isPaymentEnabled = false
   useEffect(() => {
    setMounted(true)
  }, [])
  const handleChange = (name, value) => {
    if (name === "file" && value instanceof File) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg"]
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!allowedTypes.includes(value.type)) {
        showPopup(lang === "hi" ? "केवल PDF या JPEG/JPG फ़ाइलें ही अनुमति हैं।" : "Only PDF or JPEG/JPG files are allowed.")
        return
      }

      if (value.size > maxSize) {
        showPopup(lang === "hi" ? "फ़ाइल का आकार 10MB से अधिक नहीं होना चाहिए।" : "File size should not exceed 10MB.")
        return
      }
    }

    if (name === "phone" && typeof value === "string" && (!/^[0-9]*$/.test(value) || value.length > 10)) return

    if (name === "DOB" && typeof value === "string") {
      const selectedDate = new Date(value)
      const currentDate = new Date()

      if (selectedDate > currentDate) {
        showPopup(lang === "hi" ? "आप भविष्य की तारीख नहीं चुन सकते।" : "You cannot select a future date.")
        return
      }
    }

    if (name === "state") {
      setFormData((prev) => ({ ...prev, [name]: value, city: "" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
    const requiredFields = [
      "name",
      "phone",
      "email",
      "DOB",
      "course",
      "state",
      "city",
      "identity",
      "consent",
    ]

    const allFilled = requiredFields.every((field) => {
      if (field === "consent") return formData[field]
      return formData[field]?.toString().trim() !== ""
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[0-9]{10}$/

    if (!allFilled) {
      showPopup(lang === "hi" ? "कृपया सभी आवश्यक फ़ील्ड भरें।" : "Please fill in all required fields.")
      return false
    }

    if (!emailRegex.test(formData.email)) {
      showPopup(lang === "hi" ? "कृपया एक वैध ईमेल पता दर्ज करें।" : "Please enter a valid email address.")
      return false
    }

    if (!phoneRegex.test(formData.phone)) {
      showPopup(lang === "hi" ? "फोन नंबर केवल 10 अंकों का होना चाहिए।" : "Phone number must be exactly 10 digits.")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    const data = new FormData()

      // Properly append all form data
    data.append("name", formData.name.trim())
    data.append("email", formData.email.trim())
    data.append("phone", formData.phone.trim())
    data.append("DOB", formData.DOB)
    data.append("course", formData.course)
    data.append("state", formData.state)
    data.append("city", formData.city)
    data.append("identity", formData.identity)
    data.append("consent", formData.consent.toString())
    
    // Handle file upload properly
    if (formData.file) {
      data.append("file", formData.file)
    }

    try {
      const response = await submitRegistration(data)

      if (!response.success) {
        if (response.error) {
          showPopup(response.error)
          return
        }
        showPopup("Something went wrong.")
        return
      }

      showPopup(lang === "hi" ? "सफलतापूर्वक सब्मिट हुआ!" : "Submitted successfully!")
      resetFormData()
    } catch (err) {
      console.error("Submission error:", err)
      showPopup(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
      setShowPreview(false)
    }
  }

  const handlePreview = () => {
    if (validateForm()) setShowPreview(true)
  }

  const showPopup = (message) => {
    setDialogMessage(message)
    setShowDialog(true)
  }

  const resetFormData = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      DOB: "",
      course: "",
      state: "",
      city: "",
      file: null,
      identity: "",
      consent: false,
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetForm = () => {
    resetFormData()
    setShowDialog(false)
  }

  const renderField = (label, value) => (
    <Card>
      <CardContent className="p-3">
        <div className="text-sm">
          <span className="font-medium">{label}:</span>
          <span className="ml-2 text-muted-foreground">{value || "-"}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative py-8"
      style={{ backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")' }}
    >
      <div className="relative z-20 w-full max-w-6xl bg-white border-4 border-gray-300 shadow-lg">
        <div
          className="text-white py-4 px-6 text-center text-4xl font-extrabold"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at -24.7% -47.3%, rgba(6,130,165,1) 0%, rgba(34,48,86,1) 66.8%, rgba(15,23,42,1) 100.2%)",
          }}
        >
          {lang === "hi" ? "पंजीकरण करें" : "REGISTER"}
        </div>

        <div
          className="p-8"
          style={{
            backgroundImage: "linear-gradient(86.9deg, rgba(253, 189, 38, 0.7) 28.3%, rgba(253, 153, 38, 0.7) 118.2%)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-black">
            {lang === "hi" ? "व्यक्तिगत जानकारी" : "Personal Details"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black">
                {lang === "hi" ? "पूरा नाम" : "Full Name"} *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={lang === "hi" ? "पूरा नाम" : "Full Name"}
                className="bg-white text-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-black">
                {lang === "hi" ? "फोन नंबर" : "Phone Number"} *
              </Label>
              <Input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder={lang === "hi" ? "फोन नंबर" : "Phone Number"}
                className="bg-white text-black"
                maxLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                {lang === "hi" ? "ईमेल" : "Email"} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={lang === "hi" ? "ईमेल" : "Email"}
                className="bg-white text-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob" className="text-black">
                {lang === "hi" ? "जन्म तिथि" : "Date of Birth"} *
              </Label>
              <Input
                id="dob"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={formData.DOB}
                onChange={(e) => handleChange("DOB", e.target.value)}
                className="bg-white text-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-black">{lang === "hi" ? "कोर्स चुनें" : "Select Course"} *</Label>
              <Select value={formData.course} onValueChange={(value) => handleChange("course", value)}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={lang === "hi" ? "कोर्स चुनें" : "Select Course"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Data Science">{lang === "hi" ? "डाटा साइंस" : "Data Science"}</SelectItem>
                  <SelectItem value="Cyber Security">{lang === "hi" ? "साइबर सुरक्षा" : "Cyber Security"}</SelectItem>
                  <SelectItem value="Big Data">{lang === "hi" ? "बिग डाटा" : "Big Data"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-black">{lang === "hi" ? "राज्य चुनें" : "Select State"} *</Label>
              <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={lang === "hi" ? "राज्य चुनें" : "Select State"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(stateCityMap).map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-black">{lang === "hi" ? "शहर चुनें" : "Select City"} *</Label>
              <Select value={formData.city} onValueChange={(value) => handleChange("city", value)}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={lang === "hi" ? "शहर चुनें" : "Select City"} />
                </SelectTrigger>
                <SelectContent>
                  {(stateCityMap[formData.state] || []).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-black">{lang === "hi" ? "आप कौन हैं?" : "Who are you?"} *</Label>
              <Select value={formData.identity} onValueChange={(value) => handleChange("identity", value)}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder={lang === "hi" ? "आप कौन हैं?" : "Who are you?"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">{lang === "hi" ? "छात्र" : "Student"}</SelectItem>
                  <SelectItem value="Professional">{lang === "hi" ? "पेशेवर" : "Professional"}</SelectItem>
                  <SelectItem value="Retired Professional">
                    {lang === "hi" ? "सेवानिवृत्त पेशेवर" : "Retired Professional"}
                  </SelectItem>
                  <SelectItem value="Other">{lang === "hi" ? "अन्य" : "Other"}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-black">
                {lang === "hi" ? "फ़ाइल अपलोड करें" : "Upload File"}
              </Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.jpeg,.jpg"
                onChange={(e) => handleChange("file", e.target.files?.[0] || null)}
                className="bg-white text-black"
                ref={fileInputRef}
              />
            </div>

            <div className="md:col-span-2">
              <Card className="bg-white border-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleChange("consent", checked )}
                      className="mt-1"
                      required
                    />
                    <div className="text-black">
                      <Label htmlFor="consent" className="text-sm font-medium cursor-pointer">
                        {lang === "hi" ? "सहमति" : "Consent"} *
                      </Label>
                      <p className="text-xs mt-1 leading-relaxed">
                        {lang === "hi" ? (
                          <>
                            <strong>
                              अपने फोन नंबर प्रदान करके, आप WhatsApp और SMS के माध्यम से Kirat Learning द्वारा पेश किए जाने वाले
                              पाठ्यक्रमों और प्रशिक्षण कार्यक्रमों से संबंधित अपडेट, अनुस्मारक, प्रचार सामग्री और महत्वपूर्ण जानकारी प्राप्त
                              करने के लिए सहमत होते हैं।
                            </strong>
                            <br />
                            <br />
                            <strong>
                              हम आपकी गोपनीयता का सम्मान करते हैं और तीसरे पक्ष के साथ आपकी संपर्क जानकारी साझा नहीं करेंगे। आप किसी
                              भी समय "STOP" उत्तर देकर WhatsApp और SMS संदेश प्राप्त करने से ऑप्ट आउट कर सकते हैं।
                            </strong>
                          </>
                        ) : (
                          <>
                            <strong>
                              By providing your phone number, you consent to receive updates, reminders, promotional
                              content, and important information related to courses and training programs offered by
                              Kirat Learning via WhatsApp and SMS.
                            </strong>
                            <br />
                            <br />
                            <strong>
                              We respect your privacy and will not share your contact information with third parties.
                              You may opt out of receiving WhatsApp and SMS messages at any time by replying with
                              "STOP".
                            </strong>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-10 flex justify-end space-x-4">
            <Button disabled variant="secondary" className="bg-gray-600 text-gray-200 cursor-not-allowed">
              {lang === "hi" ? "भुगतान करें" : "Pay Now"}
            </Button>

            <Button
              onClick={handlePreview}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#001159] to-[#08306D] hover:from-[#002288] hover:to-[#0A4785]"
            >
              {lang === "hi" ? "पूर्वावलोकन करें" : "Preview"}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={(open) => !isSubmitting && setShowPreview(open)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(86.9deg, rgba(253, 189, 38, 0.7) 28.3%, rgba(253, 153, 38, 0.7) 118.2%)",
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-black">
                {lang === "hi" ? "पूर्वावलोकन" : "Preview"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {renderField(lang === "hi" ? "पूरा नाम" : "Full Name", formData.name)}
              {renderField(lang === "hi" ? "फोन नंबर" : "Phone Number", formData.phone)}
              {renderField("Email", formData.email)}
              {renderField(lang === "hi" ? "जन्म तिथि" : "Date of Birth", formData.DOB)}
              {renderField(lang === "hi" ? "कोर्स" : "Course", formData.course)}
              {renderField(lang === "hi" ? "राज्य" : "State", formData.state)}
              {renderField(lang === "hi" ? "शहर" : "City", formData.city)}
              {renderField(lang === "hi" ? "पहचान" : "Identity", formData.identity)}
              {renderField(
                lang === "hi" ? "फ़ाइल" : "File",
                formData.file?.name || (lang === "hi" ? "कोई नहीं" : "None"),
              )}
              {renderField(
                lang === "hi" ? "सहमति" : "Consent",
                formData.consent ? (lang === "hi" ? "हाँ" : "Yes") : lang === "hi" ? "नहीं" : "No",
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button onClick={() => setShowPreview(false)} disabled={isSubmitting} variant="outline">
                {lang === "hi" ? "वापस जाएं" : "Go Back"}
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? lang === "hi"
                    ? "सब्मिट कर रहा है..."
                    : "Submitting..."
                  : lang === "hi"
                    ? "पुष्टि करें और सब्मिट करें"
                    : "Confirm & Submit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {lang === "hi" ? "सूचना" : "Alert"}
              
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-700 whitespace-pre-wrap">{dialogMessage}</DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={resetForm} variant="destructive" size="sm">
              {lang === "hi" ? "रीसेट करें" : "Reset Form"}
            </Button>
            <Button onClick={() => setShowDialog(false)} size="sm">
              {lang === "hi" ? "बंद करें" : "Close"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
