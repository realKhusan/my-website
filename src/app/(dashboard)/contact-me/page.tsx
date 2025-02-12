"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/ui/code-block";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { useForm } from "react-hook-form";

import dayjs from "dayjs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { useScreenSize } from "@/hooks/use-screen-size";
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  messageI: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function ContactMe() {
  const [isSendMessage, setIsSendMessage] = useState(false);
  const { toast } = useToast();
  const { isLargerThan } = useScreenSize();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      messageI: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setIsSendMessage(true);
    form.reset();
  }

  const sampleCode = `const button = document.querySelector('#sendBtn');

const message = {
	name: "${form.watch("name")}",
	email: "${form.watch("email")}",
	message: "${form.watch("messageI")}",
	date: "${dayjs().format("YYYY-MM-DD")}",
}

button.addEventListener('click', () => {
	form.send(message);
})`;

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-full  min-w-full"
    >
      <ResizablePanel defaultSize={45}>
        <div className="p-5 mx-auto md:h-full   sm:max-w-[400px] ">
          {isSendMessage ? (
            <div className="text-center  sm:max-w-[400px] mt-[50px] sm:mt-0 h-full flex gap-5 flex-col justify-center items-center">
              <h1 className="text-3xl ">Thank you! 🤘 </h1>
              <h2 className="text-lg">
                Your message has been accepted. You will recieve answer really
                soon!
              </h2>
              <Button onClick={() => setIsSendMessage(false)}>
                send-new-message
              </Button>
            </div>
          ) : (
            <div className=" mt-[50px] md:mt-[100px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 w-full"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>_name:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>_email:</FormLabel>
                        <FormControl>
                          <Input type="email" id="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="messageI"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>_message:</FormLabel>
                        <FormControl>
                          <Textarea id="message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </ResizablePanel>
      {isLargerThan("lg") && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize={55}>
            <div className="md:flex mt-[50px] md:mt-[100px]  md:items-center p-5 md:h-full">
              <CodeBlock code={sampleCode} />
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}

export default ContactMe;
