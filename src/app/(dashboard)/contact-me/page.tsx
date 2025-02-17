"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
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
import { ToastAction } from "@/components/ui/toast";
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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(
        "https://0d66cdb5761cc26d.mokky.dev/messages",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        console.log("About to show success toast");
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px]  rounded-md bg-black/70 p-4">
              <code className=" text-white whitespace-pre-wrap break-all">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        setIsSendMessage(true);
        form.reset();
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Message not sent, please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (e) {
      toast({
        title: "error",
        variant: "destructive",
        description: String(e),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

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
              <Button variant="main" onClick={() => setIsSendMessage(false)}>
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
                  <Button variant={"main"} type="submit">
                    submit-message
                  </Button>
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
