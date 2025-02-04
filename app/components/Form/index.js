export const Form = (dataScheme) => {
  return (
    <Form
      initialValues={{ remember: true }}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="gx-form-row0"
    >
      <Form.Item
        initialValue="demo@example.com"
        rules={[{ required: true, message: "The input is not valid E-mail!" }]}
        name="email"
      >
        <Input placeholder="Email" />
      </Form.Item>
    </Form>
  );
};
