import { CmsDate } from "@/components/Cms/Form/Date";
import { CmsSwitch } from "@/components/Cms/Form/Switch";
import { CmsTextEditor } from "@/components/Cms/Form/TextEditor";
import { CmsTextArea } from "@/components/Cms/Form/Textarea";
import { CmsUpload } from "@/components/Cms/Form/Upload";
import { CmsSelectMultiple } from "@/components/Cms/Form/SelectMultiple";
import { useState, useEffect } from "react";
import { handleFetchCustomerList } from "app/api/helper";
import { Checkbox } from 'antd';  // Pastikan ini ada di bagian atas file Anda
import { Select, Spin } from 'antd'; // Menggunakan Select dari Ant Design
import axios from 'axios'; // Untuk melakukan request API
const { Option } = Select
const { CmsLoader } = require("@/components/Cms");
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form");

export const ModalCreateContent = ({ formData, props, stateKey }) => {
  const { state, dispatch, handler } = props;

  if (!state[stateKey]) return null;
  if (state.IS_ON_LOADING) {
    return <CmsLoader title="Loading" customHeight={"300px"} />;
  }

  const [selectedMembers, setSelectedMembers] = useState(formData.members || []);  // Inisialisasi dengan data awal
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Mengambil data anggota dari API
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3030/users');  // Gantilah dengan URL API Anda
        setMembers(response.data);  // Simpan data yang diambil ke state members
        setLoading(false);  // Matikan loading setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };
    fetchMembers();  // Panggil fungsi untuk mengambil data
  }, []);

  const handleSelectChange = (value) => {
    setSelectedMembers(value);  // Update selectedMembers

    // Update formData dengan nilai baru untuk members
    const selectedMembersData = members.filter((member) => value.includes(member.uid));
    handler.handleFormUpdate("members", selectedMembersData);  // Update formData dengan data lengkap anggota
  };
 
  let {
    name: inputName,
    type: inputType,
    members: inputMembers
  } = formData;

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputName}
          onChange={(e) => {
            handler.handleFormUpdate("name", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputType}
          onChange={(e) => {
            handler.handleFormUpdate("type", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <h5 style={{ fontWeight: "bold" }}>Members</h5>  {/* Menggunakan h5 karena h7 tidak valid */}
        <Select
          mode="multiple" // MultiSelect aktif
          value={selectedMembers} // Nilai yang dipilih
          onChange={handleSelectChange} // Handler perubahan nilai
          placeholder="Please select members"
          style={{ width: "100%" }}
          disabled={!inputType?.value} // Tambahkan ?. untuk menghindari error
        >
          {loading ? (
            <Option disabled key="loading">Loading...</Option>
          ) : (
            members.length > 0 ? members.map((member) => (
              <Option key={member.uid} value={member.uid}>
                {member.displayName || member.email} {/* Menampilkan nama atau email */}
              </Option>
            )) : (
              <Option disabled key="no-data">No members available</Option>
            )
          )}
        </Select>
      </CmsDivRow>
    </>
  );
};
